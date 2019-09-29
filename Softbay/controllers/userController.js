const userController = function(){

    const getRegister = function(context){
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function() {
            this.partial("../views/user/registerPage.hbs");
        });
    };

    const getLogin = function(context){
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function() {
            this.partial("../views/user/loginPage.hbs");
        });
    };

    const postRegister = function(context){
        userModel.register(context.params)
        .then(helper.handler)
        .then((data) => {
            storage.saveUser(data);

            //notify
            context.redirect("#/home");
        });
    };

    const postLogin = function(context){
         userModel.login(context.params)
         .then(helper.handler)
         .then((userData) => {
            console.log(userData);
            localStorage.setItem("userInfo", JSON.stringify(userData));
            localStorage.setItem("authToken", userData._kmd.authtoken)
            //notify
            context.redirect("#/home");
         });
    };

    const logout = function(context){
        userModel.logout()
        .then(helper.handler)
        .then(() => {
            localStorage.clear();
            context.redirect("#/home");
        });
    };

    const getProfilePage = function(context){
        updateUser(context);
        helper.addHeaderInfo(context);
        context.user = JSON.parse(localStorage.getItem("userInfo"));
        context.user.purchases = 0;
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function() {
            this.partial("../views/user/profilePage.hbs");
        });
    };

    const updateUser = function(context){
        
    };


    return{
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout,
        getProfilePage
    };
}();