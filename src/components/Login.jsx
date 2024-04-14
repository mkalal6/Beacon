import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'
import './Login.css';  // Confirm this path is correct

const YourApp = withAuthInfo((props) => {
    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions()
    const logoutFunction = useLogoutFunction();  // Correct usage of logout function

    if (props.isLoggedIn) {
        return (
            <div className="login-container">
                <div className="logged-in-message">
                    <h2>Welcome Back!</h2>
                    <p>You are logged in as {props.user.email}</p>
                    <div className="logged-in-buttons">
                        <button onClick={() => redirectToAccountPage()}>Account</button>
                        <button onClick={() => logoutFunction()}>Logout</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="login-container">
                <div className="login-form">
                    <h2>Welcome!</h2>
                    <button onClick={() => redirectToLoginPage()}>Login</button>
                    <button onClick={() => redirectToSignupPage()}>Signup</button>
                </div>
            </div>
        );
    }
});

export default YourApp;
