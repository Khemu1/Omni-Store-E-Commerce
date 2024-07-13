import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigateTo = useNavigate();
  const [searchParams] = useSearchParams();
  const [path, setPath] = useState<null | string>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setPath(`/?sort=${sortParam}`);
    } else {
      if (!path) {
        setPath("/");
      }
    }
  }, [searchParams]);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="nav">
      <div className="Logo flex gap-2">
        <Link to={path ?? "/"} className="logo flex w-[200px]">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="object-contain"
          />
        </Link>
      </div>

      {/* Desktop design */}
      <div className="sm:flex hidden">
        {!isLoggedIn ? (
          <Link to="/register" className="nav-btn text-lg">
            Sign up
          </Link>
        ) : (
          <div className="flex gap-5 items-center">
            <Link to="myprofile" className="">
              <img
                src="/assets/icons/user.svg"
                alt="cart"
                className="object-contain w-[35px]"
              />
            </Link>
            <Link to="user-orders" className="">
              <img
                src="/assets/icons/order.svg"
                alt="cart"
                className="object-contain w-[35px]"
              />
            </Link>
            <Link to="/user-cart" className="w-[35px]">
              <img
                src="/assets/icons/cart.svg"
                alt="cart"
                className="object-contain"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile design */}
      <div className="sm:hidden">
        {!isLoggedIn ? (
          <Link to="/register" className="nav-btn text-lg">
            Sign up
          </Link>
        ) : (
          <div className="flex gap-5 items-center relative">
            <button type="button" onClick={handleMenuOpen}>
              <img
                src="/assets/icons/menu.svg"
                alt="menu"
                className="object-contain w-[35px]"
              />
            </button>
            {isMenuOpen && (
              <div className="nav-menu">
                <Link to="myprofile" className="nav-menu-link">
                  <img
                    src="/assets/icons/user.svg"
                    alt="cart"
                    className="object-contain w-[35px]"
                  />
                </Link>
                <Link to="user-orders" className="nav-menu-link">
                  <img
                    src="/assets/icons/order.svg"
                    alt="cart"
                    className="object-contain w-[35px]"
                  />
                </Link>
                <Link to="/user-cart" className="nav-menu-link">
                  <img
                    src="/assets/icons/cart.svg"
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

export default Nav;
