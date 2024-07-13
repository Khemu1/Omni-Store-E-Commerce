import { InfoFieldProps } from "../../../types";
const InfoField = ({ type, title }: InfoFieldProps) => {
  return (
    <div className="inputfield_container">
      <div className="flex flex-col gap-2 justify-center item">
        <p className="font-semibold">{title}</p>
        <input
          type={type}
          value="value"
          readOnly
          className="border rounded-lg px-3 py-1"
        />
      </div>
      <div className="flex items-end">
        <button type="button" className="edit_button">
          Edit
        </button>
      </div>
    </div>
  );
};

export default InfoField;
