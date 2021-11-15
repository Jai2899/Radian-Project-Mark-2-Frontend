import { useContext, useState } from "react";
import AuthContext from "./context/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setisLogin] = useState(true);
  const context = useContext(AuthContext);
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
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        // console.log(resData["data"]["login"]["userId"]);
        if (resData["data"]["login"]["token"]) {
          context.login(
            resData["data"]["login"]["token"],
            resData["data"]["login"]["userId"],
            resData["data"]["login"]["tokenExpiration"]
          );
        }
        //sessionStorage.setItem(userID, resData["data"]["login"]["userId"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const switchmodehandler = (e) => {
    setisLogin(!isLogin);
  };

  return (
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
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={switchmodehandler}>
            Switch to {isLogin ? "Signup" : "Login"}
          </button>
        </div>
      </form>
  );
};

export default Login;