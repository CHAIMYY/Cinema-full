import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import './forms.css';
import { loginUser } from "../redux/apiCalls/authApiCall";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email is required");
        if (password.trim() === "") return toast.error("Password is required");

        dispatch(loginUser({ email, password }));
    };

    return (
        <>
            <section className="form-container">
                <h1 className="form-title">Login</h1>
                <form onSubmit={formSubmitHandler} className="Login">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" placeholder="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" placeholder="password" id="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="form-btn">Log in</button>
                </form>
            </section>
        </>
    );
}
