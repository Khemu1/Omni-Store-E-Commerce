import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
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
            <button type="button" className="nav-btn text-lg">
              Login
            </button>
          </>
        ) : (
          <div className="flex gap-5 items-center">
            <Link to="/user-profile">username</Link>
            <Link
              to="user-orders"
              className="nav-btn text-inter font-semibold text-lg"
            >
              orders
            </Link>
            <Link to="user/cart" className="w-[35px]">
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
            <button type="button" className="nav-btn text-lg">
              Login
            </button>
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
                <Link to="/user-profile" className="nav-menu-link">
                  username
                </Link>
                <Link to="/user-orders" className="nav-menu-link">
                  Orders
                </Link>
                <Link
                  to="user/cart"
                  className="nav-menu-link  flex justify-center"
                >
                  <img
                    src="/assets/icons/cart.png"
                    alt="cart"
                    className="object-contain w-[25px]"
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
