import { Request, Response } from "express";
import Card from "../models/cards";
import { CardFormProps, CardProps } from "../types";

export async function addCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const card = req.card;
    if (!user || !card) {
      return res
        .status(400)
        .json({ message: "User or card information is missing" });
    }

    const [allCards, serach] = await Promise.all([
      Card.find({ userId: user._id }),
      Card.findOne({ userId: user._id, number: card.number }),
    ]);

    if (serach) {
      return res.status(400).json({ message: "Card already exists" });
    }
    if (allCards.length === 0) {
      const newCard = await new Card({
        userId: user._id,
        ...card,
        last4Numbers: card.number.slice(-4),
        default: true,
      });
      newCard.save();
      return res
        .status(201)
        .json({ message: "Card added successfully", newCard });
    }

    const newCard = await new Card({
      userId: user._id,
      last4Numbers: card.number.slice(-4),
      ...card,
    });
    newCard.save();
    return res
      .status(201)
      .json({ message: "Card added successfully", newCard });
  } catch (error) {
    console.error("Error adding card:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}
export async function getCards(req: Request, res: Response) {
  try {
    const user = req.user;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(401).json({ message: "Invalid user data" });
    }

    const [cardsData] = await Promise.all([
      Card.find({ userId: user._id }).select("-cvc").lean(),
    ]);

    const cards: CardProps[] = cardsData as CardProps[];

    const maskNumber = (number: string) => "•••• •••• •••• " + number.slice(-4);

    const maskedCards = cards.map((card) => ({
      ...card,
      number: maskNumber(card.number),
    }));

    const defaultCard = maskedCards.find((card) => card.default === true);

    return res.status(200).json({ cards: maskedCards, defaultCard });
  } catch (error) {
    console.error("Error getting cards:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
export async function getCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id: cardId } = req.query;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(401).json({ message: "Invalid user data" });
    }

    const cardData = await Card.findOne({ _id: cardId, userId: user._id })
      .select("-userId -type")
      .lean();

    return res.status(200).json(cardData);
  } catch (error) {
    console.error("Error getting cards:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function setCardDefault(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.body;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24 ||
      !id
    ) {
      return res.status(400).json({ message: "Invalid user or card ID" });
    }
    await Card.updateMany({ userId: user._id }, { $set: { default: false } });
    await Card.findByIdAndUpdate(id, { $set: { default: true } });
    return res.status(200).json({ message: "Card set as default" });
  } catch (error) {
    console.error("Error setting card as default:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id: cardId } = req.query;
    const { name, number, cvc, expiry, type }: CardFormProps = req.body;
    if (
      !user ||
      typeof user._id.toString() !== "string" ||
      typeof cardId !== "string" ||
      cardId.length !== 24
    ) {
      return res.status(401).json({ message: "Invalid user data" });
    }
    await Card.findByIdAndUpdate(cardId, {
      name,
      number,
      cvc,
      expiry,
      type,
    });
    return res.status(200).json({ message: "Card updated successfully" });
  } catch (error) {
    console.error("Error updating card:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteCard(req: Request, res: Response) {
  try {
    const user = req.user;
    const { id } = req.query;

    if (
      !user ||
      !id ||
      typeof user._id.toString() !== "string" ||
      user._id.toString().length !== 24
    ) {
      return res.status(400).json({ message: "Invalid user or card ID" });
    }

    const cardToDelete = await Card.findById(id);

    if (
      !cardToDelete ||
      cardToDelete.userId.toString() !== user._id.toString()
    ) {
      return res.status(404).json({ message: "Card not found" });
    }

    await Card.findByIdAndDelete(id);

    if (cardToDelete.default) {
      const remainingCards = await Card.find({ userId: user._id });

      if (remainingCards.length > 0) {
        const newDefaultCard = remainingCards[0];
        newDefaultCard.default = true;
        await newDefaultCard.save();
      }
    }

    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
