function attachEvents() {
    // class Catch {
    //     constructor(angler, weight, species, location, bait, captureTime){
    //         this.angler = angler;
    //         this.weight = weight;
    //         this.species = species;
    //         this.location = location;
    //         this.bait = bait;
    //         this.captureTime = captureTime;
    //     }
    // }

    const URLS = {
        GET_CATCHES: "https://fisher-game.firebaseio.com/catches.json",
        CREATE_CATCH: "https://fisher-game.firebaseio.com/catches.json"
    };

    //LOGIC START POINT
    const loadButton = document.querySelector("button.load");
    loadButton.addEventListener("click", listCatches);

    const addButton = document.querySelector("button.add");
    addButton.addEventListener("click", addFish);

    function listCatches() {
        clearOldCatches();

        fetch(URLS.GET_CATCHES)
            .then(handler)
            .then(attachCatches);
    }

    function clearOldCatches(){
        document.getElementById("catches").innerHTML = "";
    }

    function attachCatches(catches) {
        for (const key in catches) {
            if (catches.hasOwnProperty(key)) {
                const catchedFish = catches[key];
                displayCatchedFish(catchedFish, key);
            }
        }
    }

    function displayCatchedFish(fish, fishId) {
        const { angler, weight, species, location, bait, captureTime } = fish;

        const catchesDiv = document.getElementById("catches");

        const catchDiv = createHtmlElement("div", null, "catch", null, null);
        catchDiv.setAttribute("data-id", fishId);

        const anglerLabel = createHtmlElement("label", null, null, "Angler");
        const anglerInput = createHtmlElement("input", "text", "angler", null, angler);

        const hr = createHtmlElement("hr", null, null, null, null);

        const weightLabel = createHtmlElement("label", null, null, "Weight");
        const weightInput = createHtmlElement("input", "number", "weight", null, weight);

        const secondHr = createHtmlElement("hr", null, null, null, null);

        const speciesLabel = createHtmlElement("label", null, null, "Species");
        const speciesInput = createHtmlElement("input", "text", "species", null, species);

        const thirdHr = createHtmlElement("hr", null, null, null, null);

        const locationLabel = createHtmlElement("label", null, null, "Location");
        const locationInput = createHtmlElement("input", "text", "location", null, location);

        const fourthHr = createHtmlElement("hr", null, null, null, null);

        const baitLabel = createHtmlElement("label", null, null, "Bait");
        const baitInput = createHtmlElement("input", "text", "bait", null, bait);

        const fifthHr = createHtmlElement("hr", null, null, null, null);

        const captureTimeLabel = createHtmlElement("label", null, null, "Capture Time");
        const captureTimeInput = createHtmlElement("input", "number", "captureTime", null, captureTime);

        const sixtHr = createHtmlElement("hr", null, null, null, null);

        const updateButton = createHtmlElement("button", null, "update", "Update", null);
        updateButton.addEventListener("click", updateCatch);

        const deleteButton = createHtmlElement("button", null, "delete", "Delete", null);
        deleteButton.addEventListener("click", deleteCatch);

        catchDiv.appendChild(anglerLabel);
        catchDiv.appendChild(anglerInput);
        catchDiv.appendChild(hr);
        catchDiv.appendChild(weightLabel);
        catchDiv.appendChild(weightInput);
        catchDiv.appendChild(secondHr);
        catchDiv.appendChild(speciesLabel);
        catchDiv.appendChild(speciesInput);
        catchDiv.appendChild(thirdHr);
        catchDiv.appendChild(locationLabel);
        catchDiv.appendChild(locationInput);
        catchDiv.appendChild(fourthHr);
        catchDiv.appendChild(baitLabel);
        catchDiv.appendChild(baitInput);
        catchDiv.appendChild(fifthHr);
        catchDiv.appendChild(captureTimeLabel);
        catchDiv.appendChild(captureTimeInput);
        catchDiv.appendChild(sixtHr);
        catchDiv.appendChild(updateButton);
        catchDiv.appendChild(deleteButton);

        catchesDiv.appendChild(catchDiv);
    }

    function updateCatch() {
        const catchDiv = this.parentNode;
        const fishInfo = getFishInfo(catchDiv);
        const fishId = catchDiv.getAttribute("data-id");

        fetch(`https://fisher-game.firebaseio.com/catches/${fishId}.json`, {
            method: "PUT",
            body: JSON.stringify(fishInfo)
        })
            .then(handler);
    }

    function deleteCatch() {
        const catchDiv = this.parentNode;

        const fishId = catchDiv.getAttribute("data-id");

        fetch(`https://fisher-game.firebaseio.com/catches/${fishId}.json`, {
            method: "DELETE"
        })
            .then(handler)
            .then(() => {
                catchDiv.parentNode.removeChild(catchDiv);
            });
    }

    function addFish() {
        const addForm = document.getElementById("addForm");
        const fish = getFishInfo(addForm);

        clearAddFormInputFields();

        if (fish) {
            fetch(URLS.CREATE_CATCH, {
                method: "post",
                body: JSON.stringify(fish)
            })
                .then(handler)
                .then(() => {
                    const loadButton = document.querySelector("button.load");
                    loadButton.click();
                });
        }
    }

    function getFishInfo(fishInfoElement) {
        const angler = fishInfoElement.querySelector("input.angler").value;
        const weight = fishInfoElement.querySelector("input.weight").value;
        const species = fishInfoElement.querySelector("input.species").value;
        const location = fishInfoElement.querySelector("input.location").value;
        const bait = fishInfoElement.querySelector("input.bait").value;
        const captureTime = fishInfoElement.querySelector("input.captureTime").value;

        const fishData = [angler, weight, species, location, bait, captureTime];

        let isFishInfoValid = validateFishInfo(fishData);

        if (isFishInfoValid) {
            return {
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            };
        }
    }

    function validateFishInfo(fishInfo) {
        for (const fishSpec of fishInfo) {
            if (!fishSpec) {
                return false;
            }
        }

        return true;
    }

    function clearAddFormInputFields(){
        const addForm = document.getElementById("addForm");

        addForm.querySelector("input.angler").value = "";
        addForm.querySelector("input.weight").value = "";
        addForm.querySelector("input.species").value = "";
        addForm.querySelector("input.location").value = "";
        addForm.querySelector("input.bait").value = "";
        addForm.querySelector("input.captureTime").value = "";
    }

    function createHtmlElement(tagName, type, className, textContent, value) {
        const newElement = document.createElement(tagName);

        if (newElement) {
            if (className) {
                newElement.classList.add(className);
            }

            if (type) {
                newElement.setAttribute("type", type);
            }

            if (textContent) {
                newElement.textContent = textContent;
            }

            if (value) {
                newElement.value = value;
            }

            return newElement;
        }

        throw new Error("Invalid TagName!");
    }
}

function handler(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Something went wrong! " + response.status);
    }
}

attachEvents();

