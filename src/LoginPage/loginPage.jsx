import { Footer } from "../GeneralComponents/Footer/footer";
import { BannerLogo } from "./Components/BannerLogo/bannerLogo";
import "./loginpage.css"
export const LoginPage = () => {
    return (
        <div className="login-page">
            <BannerLogo />
            <div className="login-form">
                <div className="text-container">
                    <h1 className="login-title">Sign in</h1>
                    <p className="login-subtitle">One place for all your logistics clarity.</p>
                </div>
                <input className="input" type="text" placeholder="Username" />
                <input className="input" type="password" placeholder="Password" />
                <button className="login-button" type="submit">Sign in</button>
            </div>
            <Footer />
        </div>
    )
}