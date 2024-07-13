import React from "react";

const Password = () => {
  return (
    <div className="inputfield_container">
      <div>
        <p>Password</p>
        <input
          type="password"
          value="password"
          readOnly
          className="border rounded-lg"
        />
      </div>
      <button type="button" className="edit_button">
        Edit
      </button>
    </div>
  );
};

export default Password;
