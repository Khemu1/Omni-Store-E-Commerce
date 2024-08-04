import { InfoFieldProps } from "../../../types";
import { useNavigate } from "react-router-dom";

const InfoField = ({ type, value, name, style, to }: InfoFieldProps) => {
  const navigateTo = useNavigate();

  const handleNavigation = () => {
    navigateTo(`/myprofile/edit-${to.toLowerCase()}`);
  };

  return (
    <div className={style ? style : "inputfield_container"}>
      <div className="flex flex-col gap-2 justify-center item">
        <p className="font-semibold">{name}</p>
        {type === "password" ? (
          <input
            type="password"
            value={value}
            className="focus:outline-none bg-transparent "
            readOnly
          />
        ) : (
          <div className="font-lato text-gray-600 font-semibold">{value}</div>
        )}
      </div>
      <div className="flex items-end">
        <button onClick={handleNavigation} className="edit_button">
          Edit
        </button>
      </div>
    </div>
  );
};

export default InfoField;
