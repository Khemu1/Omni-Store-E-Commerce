import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../index";
import { RootState } from "../../store/index";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signout } from "../../../utils/ProfileAPIs";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Nav = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const navMenuButton = useRef<HTMLButtonElement>(null);
  // Compute the path based on searchParams
  const path = searchParams.get("sort")
    ? `/?sort=${searchParams.get("sort")}`
    : "/";

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setTimeout(() => {
      setIsMenuOpen((prev) => !prev);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node) &&
        navMenuButton.current &&
        !navMenuButton.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="Logo flex gap-2">
        <Link to={path} className="logo flex w-[100px] sm:w-[170px]">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="object-contain"
          />
        </Link>
      </div>
      <SearchBar />

      {/* Desktop design */}
      <div className="sm:flex hidden">
        {!authState.isAuthenticated ? (
          <Link to="/login" className="nav-btn text-lg">
            Sign In
          </Link>
        ) : (
          <div className="flex gap-5 items-center">
            <Link to="myprofile" className="flex flex-col items-center">
              <img
                src="/assets/icons/user.svg"
                alt="profile"
                className="object-contain w-[35px]"
              />
              <p className="text-sm font-semibold overflow-hidden text-ellipsis text-nowrap">
                {authState.user.username}
              </p>
            </Link>
            <Link to="/myprofile/display-orderlist" className="">
              <img
                src="/assets/icons/order.svg"
                alt="orders"
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
            <button
              className="nav-btn_signout"
              onClick={async () => {
                await signout();
                dispatch(logout());
                navigateTo("/", { replace: true });
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Mobile design */}
      <div className="sm:hidden flex items-end">
        {!authState.isAuthenticated ? (
          <Link to="/register" className="nav-btn text-lg">
            Sign In
          </Link>
        ) : (
          <div className="flex gap-5 items-center relative">
            <button type="button" onClick={handleMenuOpen} ref={navMenuButton}>
              <img
                src="/assets/icons/menu.svg"
                alt="menu"
                className="object-contain w-[35px]"
              />
            </button>
            {isMenuOpen && (
              <div className="nav-menu" ref={navMenuRef}>
                <Link to="myprofile" className="nav-menu-link">
                  <img
                    src="/assets/icons/user.svg"
                    alt="profile"
                    className="object-contain w-[35px]"
                  />
                </Link>
                <Link
                  to="/myprofile/display-orderlist"
                  className="nav-menu-link"
                >
                  <img
                    src="/assets/icons/order.svg"
                    alt="orders"
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
                <button
                  className="nav-btn_signout"
                  onClick={async () => {
                    await signout();
                    dispatch(logout());
                    navigateTo("/", { replace: true });
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
