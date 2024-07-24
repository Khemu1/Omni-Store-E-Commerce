import { InfoField } from "../index";
import { useAccountInfo } from "../../hooks/profile";

const MyBasicInfo = () => {
  const { data: accountInfo } = useAccountInfo();
  console.log(accountInfo);

  // Define the types for each field
  const fieldTypes: { [key: string]: string } = {
    email: "email",
    username: "text",
    password: "password",
    mobileNumber: "tel",
  };
  // used bracket notation to determine the values at runtime
  const keys = accountInfo ? Object.keys(accountInfo) : [];

  return (
    <section className="flex justify-center font-lato flex-col items-center my-10">
      <div className="border-2 border-gray-300 rounded-lg sm:w-[400px] gap-6">
        <div className="info flex flex-col">
          {accountInfo &&
            keys.map((key, index) => (
              <InfoField
                key={key}
                value={(accountInfo[key] as string) || "empty"}
                type={fieldTypes[key] || "text"}
                name={key.charAt(0).toUpperCase() + key.slice(1)}
                style={
                  index === keys.length - 1
                    ? "last_inputfield_container"
                    : undefined
                }
                to={key}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MyBasicInfo;
