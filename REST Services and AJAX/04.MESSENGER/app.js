function attachEvents() {
    const URLS = {
        GET: "https://rest-messanger.firebaseio.com/messanger.json",
        POST: "https://rest-messanger.firebaseio.com/messanger.json"
    };


    const submitButton = document.getElementById("submit");
    const refreshButton = document.getElementById("refresh");
    const messages = document.getElementById("messages");

    refreshButton.addEventListener("click", reloadMessages);

    submitButton.addEventListener("click", sentMessage);

    function reloadMessages() {
        fetch(URLS.GET)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];

                        const { author, content } = element;

                        messages.textContent += `${author}: ${content}\n`;
                    }
                }
            });
    }

    function sentMessage() {
        const author = document.getElementById("author").value;
        const content = document.getElementById("content").value;

        const message = {
            author,
            content
        };

        fetch(URLS.POST, {
            method: "POST",
            body: JSON.stringify(message)
        })
            .then(() => {
                reloadMessages();
            });
    }
}

attachEvents();