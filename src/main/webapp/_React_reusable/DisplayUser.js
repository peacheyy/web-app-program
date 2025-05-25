function DisplayUser(obj) {
    if (!obj) {
        return "";
    }
    
    return `
        <div class='profile-container'>
            <div class='profile-details'>
                <p>Email: ${obj.userEmail}</p>
                <p>Role: ${obj.userRoleType}</p>
                <p>Birthday: ${obj.birthday}</p>
                <p>Membership Fee: ${obj.membershipFee}</p>
                <p>User ID: ${obj.webUserId}</p>
            </div>
            ${obj.userImage ? 
                `<div class='profile-image'>
                    <img src='${obj.userImage}' alt='Profile Image' style='max-width:200px'/>
                </div>`
                : 
                `<p>No profile image available</p>`
            }
        </div>
    `;
}