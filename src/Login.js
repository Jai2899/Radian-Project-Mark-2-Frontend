import { useContext, useState } from "react";
import AuthContext from "./context/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setisLogin] = useState(true);
  const context = useContext(AuthContext);
  const [isError,setIsError]=useState(false);
  const [isSignUpPassed,setIsSignUpPassed]=useState(false);
  const [isAccountCreationFailed,setIsAccountCreationFailed]=useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    //console.log(email,password);
    let requestBody = {
      query: `
     query{
       login(email:"${email}",password:"${password}"){
         userId
         token
         tokenExpiration
       }
     }`,
    };
    if (!isLogin) {
      requestBody = {
        query: `
        mutation{
          createUser(userInput:{email:"${email}",password:"${password}"}){
            _id
            email
            password
          }
        }
        `,
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        
        if (res.status !== 200 && res.status !== 200) {
          setIsError(true);
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        if(!isLogin)
        {
          console.log(resData);
          if(resData["errors"])
          {
            setIsAccountCreationFailed(true);
          }
          else if(resData["data"]["createUser"]["_id"]){
            setIsSignUpPassed(true);
          }
        }
        else{
        if (resData["data"]["login"]["token"]) {
          context.login(
            resData["data"]["login"]["token"],
            resData["data"]["login"]["userId"],
            resData["data"]["login"]["tokenExpiration"]
          );
        }
      }
      })
      .catch((err) => {
        console.log(err);
        //setIsAccountCreationFailed(true);
      });
  };
  const switchmodehandler = (e) => {
    setisLogin(!isLogin);
    setIsError(false);
    setIsAccountCreationFailed(false);
    setIsSignUpPassed(false);
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={switchmodehandler}>
            Switch to {isLogin ? "Signup" : "Login"}
          </button>
        </div>
        {isLogin && (<div className="WC"><h3>Dont Have an Account? Then switch to SignUp.</h3></div>)}
        {isAccountCreationFailed && (<div className="WC"><h3>This user is already registered. Try with a different ID</h3></div>)}
        {isError&&(<div className="WC"><h3>Wrong Credentials. Please Try Again!!!</h3></div>)}
        {isSignUpPassed && (<div className="WC"><h3>Sign Up Successful. Please Login Now...</h3></div>)}
      </form>
      </div>
  );
};

export default Login;