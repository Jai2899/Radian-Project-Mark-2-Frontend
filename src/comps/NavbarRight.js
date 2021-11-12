import { Link } from 'react-router-dom';
const NavbarRight = () => {
  return (
    <div className="nav-ele-right">
      <Link to="/">Search</Link>
      <Link to="/MyQuotations">My Quotations</Link>
      <Link to="/Login">Login</Link>
      <Link to="/QuoteGet">Get a Quote</Link>
    </div>
  );
}

export default NavbarRight;