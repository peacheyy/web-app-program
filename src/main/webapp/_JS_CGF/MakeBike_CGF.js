"use strict";

function MakeBike_CGF() {

    var ele = document.createElement("div");

    var myBike1 = MakeBike({
        bikeName: "Black Betty",
        bikeBrand: "Trek",
        bikeType: "Road Bike",
        bikeYear: 2021,
        bikePrice: 4499,
        imageList: [
            { "display": "Black Betty", "val": "pics/black_trek_bike.jpg" },
            { "display": "Santa Cruising", "val": "pics/santa_cruz_mountain_bike.jpg" },
            { "display": "image not provided", "val": "pics/image" }
        ],
        image: "pics/black_trek_bike.jpg"
    });
    ele.appendChild(myBike1);

    var myBike2 = MakeBike({});
    ele.appendChild(myBike2);

    var myBike3 = MakeBike({
        bikeName: "Santa Cruisin",
        bikeBrand: "Santa Cruz",
        bikeType: "Mountain Bike",
        bikeYear: 2016,
        bikePrice: 2500,
        imageList: [
            { "display": "Black Betty", "val": "pics/black_trek_bike.jpg" },
            { "display": "Santa Cruisin", "val": "pics/santa_cruz_mountain_bike.jpg" },
            { "display": "image not provided", "val": "pics/image" }
        ],
        image: "pics/santa_cruz_mountain_bike.jpg"
    });
    ele.appendChild(myBike3)

    return ele;
}
