const Username = () => {
  return (
    <div className="inputfield_container ">
      <div>
        <p>Username</p>
        <input
          type="text"
          value="username"
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

export default Username;
