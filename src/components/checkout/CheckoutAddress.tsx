import { AddressProps } from "../../../types";

interface A {
  address: AddressProps;
  isSelected: boolean;
  onSelect: () => void;
}
const CheckoutAddress = ({ address, isSelected, onSelect }: A) => {
  return (
    <div
      className="flex gap-1
    "
    >
      <input
        type="radio"
        id={address._id}
        checked={isSelected}
        onChange={onSelect}
      />
      <label htmlFor={address._id} className="font-semibold">
        {address.name} | {address.street} | {address.city}
      </label>
    </div>
  );
};

export default CheckoutAddress;
