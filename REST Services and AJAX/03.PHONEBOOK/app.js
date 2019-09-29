function attachEvents() {
    const REQUEST_URLS = { 
        GET: "https://phonebook-nakov.firebaseio.com/phonebook.json",
        POST: "https://phonebook-nakov.firebaseio.com/phonebook.json",
    };

    const loadButton = document.getElementById("btnLoad");
    const createButton = document.getElementById("btnCreate");

    loadButton.addEventListener("click", loadContacts);

    createButton.addEventListener("click", createContact);

    function loadContacts() {
        fetch(REQUEST_URLS.GET)
        .then(request => {
            if (request.ok) {
                return request.json();
            }
        })
        .then(data => {
            clearPhonebook();

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const contact = data[key];

                    const { person, phone } = contact;

                    const li = document.createElement("li");
                    li.textContent = `${person}: ${phone}`;
                    
                    const deleteButton = document.createElement("button");
                    li.appendChild(deleteButton);
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener("click", () => deleteContact(key));

                    const phonebook = document.getElementById("phonebook");
                    phonebook.appendChild(li);
                }
            }
        });

        function deleteContact(contactId){

            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${contactId}.json`,{
                method: 'delete'
            })
            .then(() => {
                loadBtnClick();
            });
        };

        const clearPhonebook = () => {
            document.getElementById("phonebook").innerHTML = "";
        };
    }

    function createContact(){
        const person = document.getElementById("person").value;
        const phone = document.getElementById("phone").value;

        const newPerson = {
            person,
            phone
        };

        fetch(REQUEST_URLS.POST, {
            method: "POST",
            body: JSON.stringify(newPerson)
        })
        .then(() => {
            clearInputFields();
            loadBtnClick();
        });
    }

    const clearInputFields = () => {
        document.getElementById("person").value = "";
        document.getElementById("phone").value = "";
    }

    const loadBtnClick = () => {
        document.getElementById("btnLoad").click();
    }
}

attachEvents();