import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify"
import './forms.css';


export default function Login(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = (e) => {

     e.preventDefault();
     if(name.trim() ==="") return toast.error("Name is required");
     if(email.trim() ==="") return toast.error("Email is required");
     if(password.trim() === "") return toast.error("Password is required");

     console.log({email,password})


    }

return(
<>

<section className="form-container">

    <h1 className="form-title">Register</h1>
    
<form onSubmit={formSubmitHandler} className="Login">
<div className="form-group">
<label htmlFor="name" className="form-label">Email</label>
<input type="name" placeholder="name" id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)}/>

    <label htmlFor="email" className="form-label">Email</label>
<input type="email" placeholder="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
<label htmlFor="password" className="form-label">Password</label>

<input type="password" placeholder="password" id="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)}/>

</div>

<button className="form-btn">Submit</button>
</form>
</section>




</>
)




}