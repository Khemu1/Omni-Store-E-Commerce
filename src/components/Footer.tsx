import { FooterProps, Footer as f } from "../../types/index";
import { footerLinks } from "../../constants/index";
import { Link } from "react-router-dom";

const Footer = () => {
  const links: FooterProps[] = footerLinks;
  return (
    <footer>
      <div className="main_info">
        <div className="left">
          <div className="footer_logo">
            <img src="/assets/icons/logo.svg" className="object-contain" />
          </div>
          <div className="footer_rights">
            <p className="text-md text-gray-700 font-lato">
              OmniStore 2024 <br /> All Rights Reserved &copy;
            </p>
          </div>
        </div>
        <div className="links">
          {links.map((link) => (
            <div className="link_group" key={link.name}>
              <p className="mb-1 text-xl font-semibold font-lato ">
                {link.name}
              </p>
              {link.links.map(({ title, url }) => (
                <Link
                  to={url}
                  key={title}
                  className="text-gray-600 text-lg font-lato"
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="privay_terms">
        <div className="flex gap-2 text-lg font-lato text-gray-800">
          <p>@2024 OmniStore.</p> All rights reserved
        </div>
        <div className="flex gap-3 font-lato text-gray-500 text-lg">
          <Link to="/" className=" ">
            Privacy & Policy
          </Link>
          <Link to="/" className=" ">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
