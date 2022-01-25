import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function SignIn() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [firstNameReg, setFirstNameReg] = useState('');
    const [secondNameReg, setSecondNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [birthDateReg, setBirthDateReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register = () => {

        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
            firstName: firstNameReg,
            secondName: secondNameReg,
            email: emailReg,
            birthDate: birthDateReg,
        }).then((Response) => {
            console.log(Response.data);
        });

    };

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((Response) => {
            if (Response.data.message) {
                setLoginStatus(Response.data.message)
            }
            else {
                setLoginStatus(Response.data[0].username)
            }
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus("User logged: " + response.data.user[0].username);
            }
        })
    }, [])

    return (
        <div className="SignIn">
            <div className="login">
                <h1>Login</h1>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <label>Password</label>
                <input type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={login}>Login</button>
                <h1>{loginStatus}</h1>
            </div>

            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input type="password"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <label>First Name</label>
                <input type="text"
                    onChange={(e) => {
                        setFirstNameReg(e.target.value);
                    }}
                />
                <label>Second Name</label>
                <input type="text"
                    onChange={(e) => {
                        setSecondNameReg(e.target.value);
                    }}
                />
                <label>E-mail</label>
                <input type="text"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}
                />
                <label>Date of birth</label>
                <input type="date"
                    onChange={(e) => {
                        setBirthDateReg(e.target.value);
                    }}
                />
                {(usernameReg != '' && passwordReg != '' && firstNameReg != '' && secondNameReg != '' && emailReg != ''
                    && birthDateReg != '') &&
                    <button onClick={register}>Register</button>
                }
            </div>
        </div>
    );
}

export default SignIn;