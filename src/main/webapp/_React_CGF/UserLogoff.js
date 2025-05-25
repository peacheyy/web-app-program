function UserLogoff() {
    "use strict";
    
    function processLogoffSuccess(obj) {
        var msg = "";
        if (obj.errorMsg.length > 0) {
            msg = `
                <h2>Logoff Successful</h2>
                <p>${obj.errorMsg}</p>
            `;
        } else {
            msg = `
                <h2>Logoff Successful</h2>
                <p>You have been logged off from the system.</p>
            `;
        }
        document.getElementById("logoffContent").innerHTML = msg;
    }

    function processLogoffFailure(msg) {
        document.getElementById("logoffContent").innerHTML = `
            <h2>Logoff Status</h2>
            <p>Error during logoff process: ${msg}</p>
        `;
    }

    // Make immediate AJAX call when component loads
    React.useEffect(() => {
        ajax_alt("webUser/logoff", processLogoffSuccess, processLogoffFailure);
    }, []);

    return (
        <div className="userLogoff">
            <div id="logoffContent">
                <p>Processing logoff request...</p>
            </div>
        </div>
    );
}