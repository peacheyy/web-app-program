"use strict";

function MakeBike({
    bikeName = "undefined",
    bikeBrand = "undefined",
    bikeModel = "undefined",
    bikeType = "undefined",
    bikeYear = 0,
    bikePrice = 0,
    imageList = [{ "display": "image not provided", "val": "pics/image" }],
    image = "pics/image"
}) {
    var bikeObj = document.createElement("div");
    bikeObj.classList.add("bike");

    // Private properties
    var name = bikeName;
    var brand = bikeBrand;
    var model = bikeModel;
    var type = bikeType;
    var year = bikeYear;
    var price = bikePrice;

    // Build the UI
    bikeObj.innerHTML = `
        <div class='bikeContentWrapper'>
            <div class='bikeInfoClass'></div>
            <div class='bikeImageClass'></div> <br />
            <select class="bikeSelectImage"></select> 
            <button class='bikeNameButtonClass'>Change bike name to: </button>
            <input class='newBikeNameInputClass'/>
            <button class='bikePriceButtonClass'>Change bike price by: </button>
            <input type='number' class='newBikePriceInputClass'/>
        </div>
    `;

    // Create variable references for all DOM elements
    var bikeInfo = bikeObj.getElementsByClassName("bikeInfoClass")[0];
    var bikeImage = bikeObj.getElementsByClassName("bikeImageClass")[0];
    var nameButton = bikeObj.getElementsByClassName("bikeNameButtonClass")[0];
    var newNameInput = bikeObj.getElementsByClassName("newBikeNameInputClass")[0];
    var priceButton = bikeObj.getElementsByClassName("bikePriceButtonClass")[0];
    var newPriceInput = bikeObj.getElementsByClassName("newBikePriceInputClass")[0];
    var selectImage = bikeObj.getElementsByClassName("bikeSelectImage")[0];

    for (var listEle of imageList) {
        var opt = document.createElement("option");
        opt.textContent = listEle.display;
        opt.value = listEle.val;
        selectImage.appendChild(opt);
    }
    selectImage.value = image;

    // Private method display, refreshes the Info div with current values
    var display = function () {
        bikeInfo.innerHTML = `
            <p>
                Name: ${name} <br/>
                Brand: ${brand} <br/>
                Model: ${model} <br/>
                Type: ${type} <br/>
                Year: ${year} <br/>
                Price: ${formatCurrency(price)}
            </p>
        `;
    };
    display(); // Initial display

    var displayImage = function () {
        bikeImage.innerHTML = `<img src="${selectImage.value}">`;
    };
    displayImage(); // Initial image display

    // Public method to change bike name
    bikeObj.setBikeName = function (newBikeName) {
        name = newBikeName;
        display();
    };

    // Public method to modify bike price
    bikeObj.changeBikePrice = function (newBikePrice) {
        price += Number(newBikePrice);
        display();
    };

    // Event listeners for buttons
    nameButton.onclick = function () {
        bikeObj.setBikeName(newNameInput.value);
    };

    priceButton.onclick = function () {
        bikeObj.changeBikePrice(newPriceInput.value);
    };

    selectImage.onchange = function () {
        displayImage();
    };

    

    function strToNum(str) {
        str += ""; // convert to string, if it's not a string.

        // remove formatting characters, if there are any
        str = str.replace("$", "");
        str = str.replace(",", "");

        var num = Number(str); // convert to number again.
        return num;
    }

    // Private function, can only be used within function MakeBike
    function formatCurrency(numStr) {
        var num = strToNum(numStr); // convert formatted string to number.

        var formattedNum = num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
        console.log("formattedNum:" + formattedNum);
        return formattedNum;
    }

    return bikeObj;
}