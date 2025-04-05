import { BannerLogo } from "./Components/bannerLogo";
import "./loginpage.css"
export const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-form">
                <BannerLogo />
                <input className="input" type="text" placeholder="Username" />
                <input className="input" type="password" placeholder="Password" />
                <button className="login-button" type="submit">Login</button>
            </div>
        </div>
    )
}