const storage = function(){
    const appKey = "kid_Bk9AzDm7B";
    const appSecret = "8fa8507dbe804ece8d9786a8d895a1ca";

    const getData = function(key){
        return localStorage.getItem(key);
    };

    const saveData = function(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    };

    const saveUser = function(data){
        saveData("userInfo", data);
        saveData("authToken", data._kmd.authtoken);
    };

    const deleteUser = function(){
        localStorage.removeItem("userInfo");
        localStorage.removeItem("authToken");
    };

    return{
        getData,
        saveData,
        saveUser,
        deleteUser,
        appKey,
        appSecret
    }; 
}();