import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setTimeout(() => {
      setIsMenuOpen((prev) => !prev);
    }, 200);
  };
  return (
    <nav className="bg-light-gray p-3 w-full flex justify-between items-center">
      <div className="Logo flex gap-2">
        <Link to="/" className="logo flex w-[200px]">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="object-contain"
          />
        </Link>
      </div>
      {/* desktop design */}
      <div className="sm:flex hidden">
        {!isLoggedIn ? (
          <>
            <Link to="/register" className="nav-btn text-lg">
              Sign up
            </Link>
          </>
        ) : (
          <div className="flex gap-5 items-center">
            <Link to="user-profile" className="">
              <img
                src="/assets/icons/user.png"
                alt="cart"
                className="object-contain w-[35px]"
              />
            </Link>
            <Link to="user-orders" className="">
              <img
                src="/assets/icons/order.png"
                alt="cart"
                className="object-contain w-[35px]"
              />
            </Link>
            <Link to="/user-cart" className="w-[35px]">
              <img
                src="/assets/icons/cart.png"
                alt="cart"
                className="object-contain"
              />
            </Link>
          </div>
        )}
      </div>
      {/* mobile design */}
      <div className="sm:hidden ">
        {!isLoggedIn ? (
          <>
            <Link to="/register" className="nav-btn text-lg">
              Sign up
            </Link>
          </>
        ) : (
          <div className="flex gap-5 items-center relative">
            <button type="button" onClick={handleMenuOpen}>
              <img
                src="/assets/icons/menu.svg"
                alt="menu"
                className="object-contain"
              />
            </button>
            {isMenuOpen && (
              <div className="nav-menu">
                <Link to="user-profile" className="nav-menu-link">
                  <img
                    src="/assets/icons/user.png"
                    alt="cart"
                    className="object-contain w-[35px]"
                  />
                </Link>
                <Link to="user-orders" className="nav-menu-link">
                  <img
                    src="/assets/icons/order.png"
                    alt="cart"
                    className="object-contain w-[35px]"
                  />
                </Link>
                <Link to="/user-cart" className="nav-menu-link">
                  <img
                    src="/assets/icons/cart.png"
                    alt="cart"
                    className="object-contain w-[35px]"
                  />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
