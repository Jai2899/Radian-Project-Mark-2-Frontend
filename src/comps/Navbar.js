import NavbarRight from "./NavbarRight";
const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <img src="/logo-1.svg" alt="site logo" width={140} height={38} />
        </a>
      </div>
      <div className="navmenu">
        <div className="nav-ele">
          <a href="/">Learn</a>
          <a href="/">States</a>
          <a href="/">For Agents</a>
          <a href="/">FAQs</a>
          <a href="/">About Us</a>
        </div>
        <NavbarRight></NavbarRight>
      </div>
    </nav>
  );
};

export default Navbar;
