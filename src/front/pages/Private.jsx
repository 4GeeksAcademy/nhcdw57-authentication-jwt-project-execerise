import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";


export const Private = () => {

    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const getUserID = async () => {

        // Retrieve token from localStorage
        const token = localStorage.getItem('jwt-token');
        const resp = await fetch(`https://opulent-trout-r4xvgp5vj54c4q-3001.app.github.dev/api/protected`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        });

        setLoaded(true);
        if (!resp.ok) {
            navigate('/login');
            throw Error("There was a problem in the login request")
        } else if (resp.status === 403) {
            navigate('/login');
            alert("Missing or invalid token")
            throw Error("Missing or invalid token");
        } else if (resp.ok) {
            const data = await resp.json();
            setUserID(data.id)
            setEmail(data.email)
            return data
        }
        else {
            throw Error("Unknown error");
        }

    }

    if (localStorage.getItem('jwt-token') === null) {
        navigate('/login')
    }

    useEffect(() => {
        getUserID()
    }, []);



    return loaded ? (
        <div className="text-center mt-5">
            <h1 className="display-4 text-danger">Welcome to the Private Page!</h1>
            <h1 className="display-4 text-primary">Your user id is: {userID}</h1>
            <h1 className="display-4 text-primary">Your email is: {email}</h1>
            <p className="lead">
                <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
            </p>
        </div>
    ) : (
        <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    );
}; 