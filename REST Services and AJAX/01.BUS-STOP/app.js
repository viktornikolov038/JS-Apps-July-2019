function getInfo() {
    const stopNameField = document.getElementById("stopName");
    const stopId = document.getElementById("stopId").value;

    const submitUrl = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;

    fetch(submitUrl)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong.");
        }
    })
    .then((data) => {
            stopNameField.textContent = data.name;
            clearBusesField();
            addBuses(data.buses);
    })
    .catch(function(err) {
        clearBusesField();
        document.getElementById("stopName").textContent = "Error";
    });

    clearInputField();
};

function addBuses(busses){
    const bussesField = document.getElementById("buses");

    for (const busId in busses) {
        if (busses.hasOwnProperty(busId)) {
            const arrivalMinutes = busses[busId];

            const busListItem = document.createElement("li");
            busListItem.textContent = `Bus ${busId} arrives in ${arrivalMinutes} minutes`;

            bussesField.appendChild(busListItem);
        }
    }
}

const clearInputField = () => {
    document.getElementById("stopId").value = "";
}

const clearBusesField = () => {
    document.getElementById("buses").innerHTML = '';
}