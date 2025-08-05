// Import necessary components from react-router-dom and other parts of the application.

import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function addUserToDatabase(){
        // check if there's even a email or password
        if (email.length == 0){
            alert("You must input an email!")
        } else if (password.length < 5){
            alert("Your password must be at least 6 characters long!")
        } else{
            const response = await fetch("https://opulent-trout-r4xvgp5vj54c4q-3001.app.github.dev/api/signup",{ 
                method: "POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({"email":email, "password":password}) });
            navigate('/');
            alert( "User created!");
        }
    }

    return (
        <div className="container">
           
            <div className="row">
                <div className="col"></div>
                <div className="col-6 text-center my-5">
                    <h1 className="p-5 mb-5 rounded-circle bg-secondary">Signup</h1>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else. (Or will we?)</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary" onClick={()=>addUserToDatabase()}>Submit</button>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};
