const helper = function(){
    
    const handler = function(response){
        if (response.status > 401) {
            console.log(response);
            throw new Error(`Something went wrong: ${response.statusText}`);
        } else if(response.status === 204){
            console.log("success");
            return;
        }
        

        return response.json();
    };

    const addHeaderInfo = function(context){
        const loggedIn = localStorage.getItem("authToken") !== null;

        if (loggedIn) {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            context.loggedIn = loggedIn;
            context.username = userInfo.username;
        }
    };

    return {
        handler,
        addHeaderInfo
    };
}();