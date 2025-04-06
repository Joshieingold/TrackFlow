import { Footer } from "../GeneralComponents/Footer/footer";
import { BannerLogo } from "./Components/BannerLogo/bannerLogo";
import "./loginpage.css"
import { useState } from "react";
import { auth } from "../GeneralComponents/Database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/Home");
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="login-page">
            <BannerLogo />
            <form className="login-form" onSubmit={handleLogin}>
                <div className="text-container">
                    <h1 className="login-title">Sign in</h1>
                    <p className="login-subtitle">Track smarter. Work smoother.</p>
                </div>
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">Please try again</p>}
                <button type="submit" className="login-button">Sign in</button>
            </form>
            <Footer />
        </div>    
    );
};