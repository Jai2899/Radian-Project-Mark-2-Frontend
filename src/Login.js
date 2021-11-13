import React from 'react';
import { useState } from "react";

export var isLogOut = false;

const Login = () => {
    const [isLogout , setIsLogout] = useState(false);
    const [isShowSignup, setIsShowSignup] = useState(false);
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isLoginMessage, setIsLoginMessage] = useState(false);
    const [errorMessageSignup, setErrorMessageSignup] = useState("");
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState();


    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const userProperties = {email, password};

        const requestBodySignup = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        email
                        password
                    }
                }
            `,
        };

        const requestBodyLogin = {
            query: `
                mutation {
                    login(userInput: {email: "${email}", password: "${password}"}) {
                        email
                        password
                    }
                }
            `,
        };

        const body = {email, password};

        if (isLogin) {
            const result = await fetch('/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBodyLogin),
            }).then((res) => {
                setIsSignup(false);
                setIsLogin(true);
                setIsShowLogin(true);
                setIsShowSignup(false);
                setIsLoginMessage(true);
                setIsLogout(true);
                isLogOut = true;
                return res.json();
            }).then((resData) => {
                console.log(resData);
                if (resData.errors) {
                    setErrorMessageLogin("Invalid Credentials!");
                    setIsLoginMessage(false);
                    setIsShowLogin(true);
                    setIsSignup(false);
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            const result = await fetch('/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBodySignup),
                // }).then((res) => {

            })
                .then((res) => {
                    setIsSignup(true);
                    setIsLogin(true);
                    setIsShowLogin(false);
                    setIsShowSignup(true);
                    return res.json();
                })
                .then((resData) => {
                    if (resData.errors) {
                        setIsShowSignup(true);
                        setIsSignup(false);
                        setIsShowLogin(false);
                        setErrorMessageSignup("User already Exists.");
                    }

                    console.log(resData);
                    setData(resData["data"]["createUser"]);

                })
                .catch((err) => {
                    console.log("it is error")

                    console.log(err);

                });
            // console.log(result)
            // if (result) console.log(result)
            //     result.then((res) => {
            //     console.log("1st")
            //     if(res.error) console.log("It is an error")
            //     setIsSignup(true);
            //     setIsLogin(true);
            //     setIsShowLogin(false);
            //     setIsShowSignup(true);
            // }).catch((err) => {
            //     console.log('2nd');
            //     console.log(err)
            //     console.log(JSON.stringify(err));
            //     setErrorMessageSignup("User already Exists.");
            //     console.log(errorMessageSignup);
            //     setIsShowSignup(true);
            //     setIsSignup(false);
            //     setIsShowLogin(false);
                // });
                // await fetch('/graphql', {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify(requestBodySignup),
                // }).then((res) => {
                //     console.log('1');
                //     console.log(res.text())
                // }).then((resData) => {
                //     console.log('2');
                //     console.log(resData.text())
                //     console.log(resData);
                //     setData(resData["data"]["createUser"]);
                //     setIsSignup(true);
                //     setIsLogin(true);
                //     setIsShowLogin(false);
                //     setIsShowSignup(true);
                // }).catch((err) => {
                //     console.log('3');
                //     console.log(err)
                //     console.log(JSON.stringify(err));
                //     setErrorMessageSignup("User already Exists.");
                //     console.log(errorMessageSignup);
                //     setIsShowSignup(true);
                //     setIsSignup(false);
                //     setIsShowLogin(false);
                // });
            // })
        }
    }

    return (
        <div className="dummy">
            <form onSubmit={submitHandler}>
                <div>
                    <label>{isLogin ? 'Login' : 'Create Account'}</label>
                    <br/>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' autoFocus onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                    <h2 style={{
                        display: isShowSignup?"block":"none"
                    }}>
                        {isSignup ? "Your account is created!" : errorMessageSignup}
                    </h2>
                    <h2 style={{
                        display: isShowLogin?"block":"none"
                    }}>
                        {isLoginMessage ? "Login Successfully!" : errorMessageLogin}
                    </h2>
                </div>
            </form>
        </div>
    );
}

export default Login;