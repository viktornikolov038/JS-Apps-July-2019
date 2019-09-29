const app = Sammy("#main", function(){

    this.use("Handlebars", "hbs");

    // Home
    this.get("#/home", homeController.getHome);

    // User
    this.get("#/register", userController.getRegister);
    this.post("#/register",userController.postRegister);

    this.get("#/login", userController.getLogin);
    this.post("#/login", userController.postLogin);

    this.get("#/logout", userController.logout);

    this.get("#/profile", userController.getProfilePage);

    //Offers
    this.get("#/create", offerContoller.getCreateOffer);
    this.post("#/create", offerContoller.createOffer);

    this.get("#/dashboard", offerContoller.getDashboard);

    this.get("#/order/details/:orderId", offerContoller.getOfferDetails);

    this.get("#/order/delete/:orderId", offerContoller.getDeleteOffer);
    this.post("#/order/delete/:orderId", offerContoller.deleteOffer);

    this.get("#/order/edit/:orderId", offerContoller.getEditOffer);
    this.post("#/order/edit/:orderId", offerContoller.editOffer);

});

(() => {
    app.run("#/home");
})();