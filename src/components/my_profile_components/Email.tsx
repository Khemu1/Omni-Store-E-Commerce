import React from "react";

const Email = () => {
  return (
    <div className="inputfield_container">
      <div>
        <p>Email</p>
        <input
          type="email"
          value="email"
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

export default Email;
