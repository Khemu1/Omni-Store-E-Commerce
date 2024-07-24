const MyProfile = () => {
  return (
    <section className="flex  justify-center font-lato items-center my-10">
      <div className="flex flex-wrap gap-3 justify-center sm:w-[1000px] sm:gap-10">
        <a href="/myprofile/login-security" className="profile_card">
          <div>
            <img
              src="/assets/icons/security.svg"
              alt=""
              className="w-[100px]"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Your Account Info</p>
            <p className="text-gray-600 text-wrap">
              Manage password, email, Username and mobile number
            </p>
          </div>
        </a>
        <a href="/myprofile/wishlist" className="profile_card">
          <div>
            <img src="/assets/icons/wishlist.svg" alt="" className="w-[60px]" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Your WishList</p>
            <p className="text-gray-600 text-wrap">
              Manage items in your withlist
            </p>
          </div>
        </a>
        <a href="/myprofile/addresses" className="profile_card">
          <div>
            <img src="/assets/icons/address.svg" alt="" className="w-[60px]" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Your Addresses</p>
            <p className="text-gray-600 text-wrap">
              Edit, remove or set default address
            </p>
          </div>
        </a>
        <a href="/myprofile/payment" className="profile_card">
          <div>
            <img src="/assets/icons/payment.svg" alt="" className="w-[60px]" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Your Payment Methods</p>
            <p className="text-gray-600 text-wrap">
              Manage or add payment methods
            </p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default MyProfile;
