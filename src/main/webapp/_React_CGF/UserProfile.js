function UserProfile() {
    "use strict";
    
    function processProfileSuccess(obj) {
        var msg = "";
        if (obj.errorMsg.length > 0) {
            msg = "<p>" + obj.errorMsg + "</p>";
        } else {
            msg = `
                <h2>User Profile</h2>
                ${DisplayUser(obj)}
            `;
        }
        document.getElementById("profileContent").innerHTML = msg;
    }

    function processProfileFailure(msg) {
        console.log("Profile request failed:", msg);
        document.getElementById("profileContent").innerHTML = 
            "<p>Error accessing profile: " + msg + "</p>";
    }

    // Make immediate AJAX call when component loads
    React.useEffect(() => {
        var url = "webUser/getProfile";
        ajax_alt(url, processProfileSuccess, processProfileFailure);
    }, []);

    return (
        <div className="userProfile">
            <div id="profileContent">
                <p>Loading profile...</p>
            </div>
        </div>
    );
}