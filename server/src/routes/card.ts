import { Router } from "express";
import {
  getCard,
  addCard,
  getCards,
  updateCard,
  setCardDefault,
  deleteCard,
} from "../controllers/card";
import { validateCard } from "../middlewares/card";
import { authenticateToken } from "../middlewares/cookie";

const cardRouter = Router();

cardRouter.post("/add-card", authenticateToken, validateCard, addCard);
cardRouter.get("/get-cards", authenticateToken, getCards);
cardRouter.get("/get-card", authenticateToken, getCard);
cardRouter.patch("/update-card", authenticateToken, updateCard);
cardRouter.patch("/set-card-default", authenticateToken, setCardDefault);
cardRouter.delete("/delete-card", authenticateToken, deleteCard);
export default cardRouter;
