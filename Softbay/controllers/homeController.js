const homeController = function(){
    const getHome = function(context){

        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function(){
            this.partial("../views/common/homePage.hbs");
        });
    };

    return{
        getHome
    };
}();