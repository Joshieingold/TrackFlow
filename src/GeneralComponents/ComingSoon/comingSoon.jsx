import { MainNavbar } from "../MainNavbar/mainNavbar";

export const ComingSoon = () => {
    return (
        <div className="coming-soon">
            <MainNavbar />
            <h1 className="coming-soon-text">Coming Soon</h1>
            <p className="coming-soon-description">I am working hard to complete this feature. Stay tuned!</p>
        </div>
    );
}