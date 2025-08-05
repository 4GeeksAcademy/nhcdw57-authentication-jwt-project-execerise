// Import necessary components from react-router-dom and other parts of the application.

import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function loginToSite(){
        // check if there's even a email or password
        const response = await fetch("https://opulent-trout-r4xvgp5vj54c4q-3001.app.github.dev/api/login",{ 
            method: "POST", 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({"email":email, "password":password}) });

        const data = await response.json();
        localStorage.setItem("jwt-token",data.token);
        navigate('/private');
        alert(`Welcome, ${email}!`)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col-6 text-center my-5">
                    <h1 className="p-5 mb-5 rounded-circle bg-secondary">Login</h1>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary" onClick={()=>loginToSite()}>Login</button>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};
