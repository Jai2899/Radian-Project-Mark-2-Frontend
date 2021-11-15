import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
const NavbarRight = () => {
  const context = useContext(AuthContext);

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div className="nav-ele-right">
            <Link to="/">Search</Link>

            {!context.token && <Link to="/Login">Login</Link>}

            <Link to="/QuoteGet">Get a Quote</Link>
            <>
              {context.token && (<Link to="/MyQuotations">My Quotations</Link>)}
              {context.token && (
                <button className="myButton" onClick={context.logout}><Link to="/">Logout</Link></button>
              )}
            </>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default NavbarRight;
