"use strict";

const BikeInsertOrUpdate = (props) => {

    var action = "insert";
    var id = "";
    var url = props.location.pathname;
    console.log("url that invoked BikeInsertOrUpdate is " + url);
    if (url.search(":") > -1) {
        const url_list = url.split(":");
        id = url_list[url_list.length - 1];
        console.log("to update id " + id);
        action = "update";
    } else {
        console.log("to insert");
    }

    const [bikeData, setBikeData] = React.useState({
        "bikeId": "",
        "bikeName": "",
        "bikeImage": "",
        "bikePrice": "",
        "yearManufactured": "",
        "bikeBrand": "",
        "bikeModel": "",
        "bikeType": "",
        "webUserId": "",
        "userEmail": ""
    });

    const [userList, setUserList] = React.useState([]);

    const [errorObj, setErrorObj] = React.useState({
        "bikeId": "",
        "bikeName": "",
        "bikeImage": "",
        "bikePrice": "",
        "yearManufactured": "",
        "bikeBrand": "",
        "bikeModel": "",
        "bikeType": "",
        "webUserId": "",
        "userEmail": "",
        "errorMsg": ""
    });

    const [isLoading, setIsLoading] = React.useState(true);

    const encodeUserInput = () => {
        var bikeInputObj = {
            "bikeId": bikeData.bikeId,
            "bikeName": bikeData.bikeName,
            "bikeImage": bikeData.bikeImage,
            "bikePrice": bikeData.bikePrice,
            "yearManufactured": bikeData.yearManufactured,
            "bikeBrand": bikeData.bikeBrand,
            "bikeModel": bikeData.bikeModel,
            "bikeType": bikeData.bikeType,
            "webUserId": bikeData.webUserId,
            "userEmail": bikeData.userEmail
        };
        console.log("bikeInputObj on next line");
        console.log(bikeInputObj);
        return encodeURI(JSON.stringify(bikeInputObj));
    };

    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    React.useEffect(() => {
        console.log("AJAX call for user list");
        ajax_alt("webUser/getAll",
            function (obj) {
                console.log("webUser/getAll Ajax success");
                if (obj.dbError && obj.dbError.length > 0) {
                    setErrorObj(setProp(errorObj, "webUserId", obj.dbError));
                } else {
                    // Sort users by email
                    obj.webUserList.sort((a, b) => {
                        if (a.userEmail > b.userEmail) return 1;
                        if (a.userEmail < b.userEmail) return -1;
                        return 0;
                    });

                    setUserList(obj.webUserList);
                    // Set initial user if this is an insert
                    if (action === "insert" && obj.webUserList.length > 0) {
                        const firstUser = obj.webUserList[0];
                        setBikeData(prevData => ({
                            ...prevData,
                            webUserId: firstUser.webUserId.toString(),
                            userEmail: firstUser.userEmail
                        }));
                    }
                }

                if (action === "update") {
                    console.log("Now getting bike record " + id + " for update");
                    ajax_alt("userBike/getById?bikeId=" + id,
                        function (obj) {
                            if (obj.errorMsg.length > 0) {
                                setErrorObj(setProp(errorObj, "errorMsg", obj.errorMsg));
                            } else {
                                console.log("got the bike record for update");
                                // Convert webUserId to string when setting the data
                                const bikeDataWithStringId = {
                                    ...obj,
                                    webUserId: obj.webUserId.toString()
                                };
                                setBikeData(bikeDataWithStringId);
                            }
                            setIsLoading(false);
                        },
                        function (ajaxErrorMsg) {
                            setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                            setIsLoading(false);
                        }
                    );
                } else {
                    setIsLoading(false);
                }
            },
            function (ajaxErrorMsg) {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    }, []);

    const validate = () => {
        console.log("Validate, should kick off AJAX call");
        console.log("Here is the bike data that will be sent to the insert/update API");
        console.log(bikeData);

        setIsLoading(true);
        ajax_alt("userBike/" + action + "?jsonData=" + encodeUserInput(),
            function (obj) {
                console.log("These are the error messages (next line)");
                console.log(obj);

                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "Record Saved !";
                }

                setErrorObj(obj);
                setIsLoading(false);
            },
            function (ajaxErrorMsg) {
                setErrorObj(setProp(errorObj, "errorMsg", ajaxErrorMsg));
                setIsLoading(false);
            }
        );
    };

    if (isLoading) {
        return <div> ... Loading ... </div>;
    }

    return (
        <table className="insertArea">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>
                        <input value={bikeData.bikeId} disabled />
                    </td>
                    <td className="error">
                        {errorObj.bikeId}
                    </td>
                </tr>
                <tr>
                    <td>Bike Name</td>
                    <td>
                        <input value={bikeData.bikeName} onChange={
                            e => setBikeData(setProp(bikeData, "bikeName", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.bikeName}
                    </td>
                </tr>
                <tr>
                    <td>Image URL</td>
                    <td>
                        <input value={bikeData.bikeImage} onChange={
                            e => setBikeData(setProp(bikeData, "bikeImage", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.bikeImage}
                    </td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>
                        <input value={bikeData.bikePrice} onChange={
                            e => setBikeData(setProp(bikeData, "bikePrice", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.bikePrice}
                    </td>
                </tr>
                <tr>
                    <td>Year Manufactured</td>
                    <td>
                        <input value={bikeData.yearManufactured} onChange={
                            e => setBikeData(setProp(bikeData, "yearManufactured", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.yearManufactured}
                    </td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>
                        <input value={bikeData.bikeBrand} onChange={
                            e => setBikeData(setProp(bikeData, "bikeBrand", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.bikeBrand}
                    </td>
                </tr>
                <tr>
                    <td>Model</td>
                    <td>
                        <input value={bikeData.bikeModel} onChange={
                            e => setBikeData(setProp(bikeData, "bikeModel", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.bikeModel}
                    </td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>
                        <input value={bikeData.bikeType} onChange={
                            e => setBikeData(setProp(bikeData, "bikeType", e.target.value))
                        } />
                    </td>
                    <td className="error">
                        {errorObj.bikeType}
                    </td>
                </tr>
                <tr>
                    <td>User Email</td>
                    <td>
                        <select
                            onChange={e => {
                                const selectedUser = userList.find(user => user.webUserId.toString() === e.target.value);
                                if (selectedUser) {
                                    setBikeData(prevData => ({
                                        ...prevData,
                                        webUserId: selectedUser.webUserId.toString(),
                                        userEmail: selectedUser.userEmail
                                    }));
                                }
                            }}
                            value={bikeData.webUserId}
                        >
                            {userList && userList.map(user => (
                                <option key={user.webUserId} value={user.webUserId.toString()}>
                                    {user.userEmail}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="error">
                        {errorObj.webUserId}
                    </td>
                </tr>
                <tr>
                    <td>
                        <br />
                        <button type="button" onClick={validate}>Save</button>
                    </td>
                    <td className="error" colSpan="2">
                        <br />
                        {errorObj.errorMsg}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};