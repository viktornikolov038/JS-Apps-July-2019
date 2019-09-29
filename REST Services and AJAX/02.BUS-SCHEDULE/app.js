function solve() {

    let currentStopName = "";
    let nextStopId = "depot";
    
    function depart() {
        const url = `https://judgetests.firebaseio.com/schedule/${nextStopId}.json`;

        fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Something went wrong.");
            }
        })
        .then(data => {
            disableDepartButton();
            enableArriveButton();

            const { name, next } = data;

            currentStopName = name;
            nextStopId = next;
            updateNextStopInfo();
            
        })
        .catch(err => {
            updateInfoAsError();
            disableDepartButton();
            disableArriveButton();
        });
    }

    function arrive() {
        updateArrivingAtInfo();
        disableArriveButton();
        enableDepartButton();
    }

    const disableDepartButton = () => {
        document.getElementById("depart").disabled = true;
    }

    const enableDepartButton = () => {
        document.getElementById("depart").disabled = false;
    }

    const enableArriveButton = () => {
        document.getElementById("arrive").disabled = false;
    }

    const disableArriveButton = () => {
        document.getElementById("arrive").disabled = true;
    }

    const updateNextStopInfo = () => {
        document.getElementById("info").textContent = `Next stop ${currentStopName}`;
    }

    const updateArrivingAtInfo = () => {
        document.getElementById("info").textContent = `Arriving at ${currentStopName}`;
    }

    const updateInfoAsError = () => {
        document.getElementById("info").textContent = `Error`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();