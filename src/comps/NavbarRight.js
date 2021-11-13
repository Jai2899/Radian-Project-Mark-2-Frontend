import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const NavbarRight = () => {



  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div className="nav-ele-right">

            <Link to="/">Search</Link>

            {!context.token && <Link to="/Login">Login</Link>}

       {!context.token &&     <Link to="/QuoteGet">Get a Quote</Link>}
            <>
              {context.token && <button onClick={context.logout} >Logout</button>}
            </>
          </div>
        )
      }}
    </AuthContext.Consumer>



  );




}

export default NavbarRight;