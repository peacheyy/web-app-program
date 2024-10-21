"use strict";

const BikeFilterSortTable = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbList, setDbList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [filterInput, setFilterInput] = React.useState("");
    const [filteredList, setFilteredList] = React.useState([]);

    React.useEffect(() => {
        ajax_alt(
            "userBike/getAll",
            function (dbList) {
                if (dbList.dbError.length > 0) {
                    setError(dbList.dbError);
                } else {
                    setDbList(dbList.userBikeList);
                    setFilteredList(dbList.userBikeList);
                }
                setIsLoading(false);
            },
            function (msg) {
                setError(msg);
                setIsLoading(false);
            }
        );
    }, []);

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
                Filterable and Sortable Bike List &nbsp;
                <input name="input" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp;
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp;
                <button onClick={clearFilter}>Clear</button>
            </h3>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortByProp("bikeName", "text")}>
                            <img src="icons/sortUpDown16.png" alt="sort" />
                            Bike Name
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th
                            onClick={() => sortByProp("bikePrice", "number")}
                            className="textAlignCenter"
                        >
                            <img src="icons/blackSort.png" alt="sort" />
                            Price
                        </th>
                        <th onClick={() => sortByProp("yearManufactured", "number")}>
                            <img src="icons/sortUpDown16.png" alt="sort" />
                            Year Manufactured
                        </th>
                        <th
                            onClick={() => sortByProp("bikeBrand", "text")}
                            className="textAlignCenter"
                        >
                            <img src="icons/blackSort.png" alt="sort" />
                            Bike Brand
                        </th>
                        <th onClick={() => sortByProp("bikeModel", "text")}>
                            <img src="icons/sortUpDown16.png" alt="sort" />
                            Bike Model
                        </th>
                        <th onClick={() => sortByProp("bikeType", "text")}>
                            <img src="icons/sortUpDown16.png" alt="sort" />
                            Bike Type
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((listObj) => (
                        <tr key={listObj.bikeId}>
                            <td>{listObj.bikeName}</td>
                            <td className="shadowImage textAlignCenter"><img src={listObj.bikeImage} /></td>
                            <td className="textAlignRight">{listObj.bikePrice}</td>
                            <td className="textAlignCenter">{listObj.yearManufactured}</td>
                            <td className="textAlignCenter">{listObj.bikeBrand}</td>
                            <td className="textAlignCenter">{listObj.bikeModel}</td>
                            <td className="textAlignCenter">{listObj.bikeType}</td>
                            <td>{listObj.errorMsg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};