"use strict";

const UserFilterSortTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [filteredList, setFilteredList] = React.useState([]);

    React.useEffect(() => {
        ajax_alt(
            "webUser/getAll",
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    setDbList(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
                }
                setIsLoading(false);
            },
            function (msg) {
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);

    const deleteListEle = (theList, indx) => {
        // This javascript "built in function" removes 1 element (2nd param),
        // starting from position indx (1st param)
        theList.splice(indx, 1);

        // You have to make React aware that the list has actually changed 
        // or else it won't re-render. Converting to JSON and back does the trick. 
        return JSON.parse(JSON.stringify(theList));
    };

    const deleteUser = (userObj, indx) => {
        console.log("To delete user " + userObj.userEmail + "?");

        if (window.confirm("Do you really want to delete " + userObj.userEmail + "? ")) {
            ajax_alt(
                "webUser/delete?userId=" + userObj.webUserId,
                function (obj) {
                    if (!obj.errorMsg) {
                        // Only update the UI if the web API call was successful
                        const newDbList = deleteListEle([...dbList], indx);
                        const newFilteredList = deleteListEle([...filteredList], indx);
                        setDbList(newDbList);
                        setFilteredList(newFilteredList);
                        alert("Successfully deleted user " + userObj.userEmail);
                    } else {
                        alert("Error deleting user: " + obj.errorMsg);
                    }
                },
                function (error) {
                    alert("Error deleting user: " + error);
                }
            );
        }
    };

    const doFilter = (filterInputVal) => {
        let newList = filterObjList(dbList, filterInputVal);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    };

    const sortByProp = (propName, sortType) => {
        let sortedList = [...filteredList];
        jsSort(sortedList, propName, sortType);
        setFilteredList(sortedList);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="clickSort">
            <h3>
                <Link to="/userInsertOrUpdate">
                    <img src="icons/insert.png" alt="Add New User" />
                </Link>
                Filterable and Sortable User List &nbsp;
                <input 
                    name="input" 
                    value={filterInput} 
                    onChange={(e) => setFilterInput(e.target.value)} 
                />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp;
                <button onClick={clearFilter}>Clear</button>
            </h3>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th onClick={() => sortByProp("userEmail", "text")}>
                            <img src="icons/sortUpDown16.png" alt="sort" />
                            Email
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th
                            onClick={() => sortByProp("birthday", "date")}
                            className="textAlignCenter"
                        >
                            <img src="icons/blackSort.png" alt="sort" />
                            Birthday
                        </th>
                        <th
                            onClick={() => sortByProp("membershipFee", "number")}
                            className="textAlignRight"
                        >
                            <img src="icons/blackSort.png" alt="sort" />
                            Membership Fee
                        </th>
                        <th onClick={() => sortByProp("userRoleType", "text")}>
                            <img src="icons/sortUpDown16.png" alt="sort" />
                            Role
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((listObj, index) => (
                        <tr key={listObj.webUserId}>
                            <td className="textAlignCenter">
                                <img 
                                    src="icons/delete.png" 
                                    className="clickLink"
                                    onClick={() => deleteUser(listObj, index)}
                                    alt="Delete"
                                />
                            </td>
                            <td>
                                <a href={`#/userUpdate/:${listObj.webUserId}`}>
                                    <img src="icons/update.png" className="clickLink" alt="Update" />
                                </a>
                            </td>
                            <td>{listObj.userEmail}</td>
                            <td className="shadowImage textAlignCenter">
                                <img src={listObj.userImage} alt="User" />
                            </td>
                            <td className="textAlignCenter">{listObj.birthday}</td>
                            <td className="textAlignRight">{listObj.membershipFee}</td>
                            <td className="nowrap">{listObj.userRoleType}</td>
                            <td>{listObj.errorMsg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};