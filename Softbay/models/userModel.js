const userModel = function(){

    const register = function(params){
        
        const data = {
            "username": params.username,
            "password": params.password
        };

        return requester.post("", "user", "Basic", data);

    };

    const login = function(params){
        const body = {...params};
        return requester.post("login", "user", "Basic", body);
    };

    const logout = function(){
        return requester.post("_logout", "user", "Kinvey");
    };

    return {
        register,
        login,
        logout
    };
}();