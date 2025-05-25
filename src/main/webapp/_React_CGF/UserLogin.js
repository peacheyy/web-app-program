function UserLogin() {
    "use strict";

    function processLoginSuccess(obj) {
        var msg = "";
        if (obj.errorMsg.length > 0) {
            msg = "Login error: " + obj.errorMsg;
        } else {
            msg = `
                <h2>Login Successful!</h2>
                <p>Welcome!</p>
                ${DisplayUser(obj)}
            `;
        }
        document.getElementById("loginContent").innerHTML = msg;
    }

    function processLoginFailure(msg) {
        console.log("Login request failed:", msg);
        document.getElementById("loginContent").innerHTML = "Error: " + msg;
    }

    const findUser = () => {
        var email = document.getElementById("emailInput").value;
        var password = document.getElementById("passwordInput").value;
        
        var url = "webUser/login?email=" + encodeURIComponent(email) 
                + "&pass=" + encodeURIComponent(password);
                
        ajax_alt(url, processLoginSuccess, processLoginFailure);
    };

    return (
        <div className="userLogin">
            <h2>Login page</h2>
            
            <p>
                Enter Email of Web User: <input id="emailInput" placeholder="e.g., user@example.com" />
                Enter Password of Web User: <input id="passwordInput" type="password" placeholder="Enter password" />
                <button onClick={findUser}>Login</button>
            </p>
            <div id="loginContent"></div>
        </div>
    );
}