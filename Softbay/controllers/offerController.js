const offerContoller = function () {

    const getCreateOffer = function (context) {
        helper.addHeaderInfo(context);
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial("../views/offers/createOfferPage.hbs");
        });
    };

    const createOffer = function (context) {
        helper.addHeaderInfo(context);

        offerModel.createOffer(context.params)
            .then(helper.handler)
            .then(() => {
                context.redirect("#/dashboard");
            });
    };

    const getDashboard = function (context) {
        helper.addHeaderInfo(context);

        offerModel.getOffers(context.params)
            .then(helper.handler)
            .then((offers) => {


                const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
                for (const key in offers) {
                    if (offers.hasOwnProperty(key)) {
                        const offer = offers[key];

                        if (offer._acl.creator === userId) {
                            offer.isCreatedByUser = true;
                        } else {
                            offer.isCreatedByUser = false;
                        }
                    }
                }



                if (offers.length > 0) {
                    context.productsAvailable = true;
                    context.products = offers;
                } else {
                    context.productsAvailable = false;
                }


                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                    offer: "../views/offers/offer.hbs"
                }).then(function () {
                    this.partial("../views/offers/dashboard.hbs");
                });

                context.redirect("#/home");
            });
    };

    const getOfferDetails = function(context){
        helper.addHeaderInfo(context);

        const offerId = context.params.orderId;
        requester.get(`offers/${offerId}`, "appdata", "Kinvey")
        .then(helper.handler)
        .then((offer) => {
            context.offer = offer;

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function () {
                this.partial("../views/offers/offerDetails.hbs");
            });
        });
    };

    const getDeleteOffer = function(context){
        helper.addHeaderInfo(context);

        const offerId = context.params.orderId;
        requester.get(`offers/${offerId}`, "appdata", "Kinvey")
        .then(helper.handler)
        .then((offer) => {
            context.offer = offer;

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function () {
                this.partial("../views/offers/deleteOfferPage.hbs");
            });
        });
    };

    const deleteOffer = function(context){
        const offerId = context.params.orderId;
        requester.del(`offers/${offerId}`, "appdata", "Kinvey")
        .then(helper.handler)
        .then(() => {
            context.redirect("#/dashboard");
        });
    };

    const getEditOffer = function(context){
        helper.addHeaderInfo(context);

        const offerId = context.params.orderId;
        requester.get(`offers/${offerId}`, "appdata", "Kinvey")
        .then(helper.handler)
        .then((offer) => {
            context.offer = offer;

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function () {
                this.partial("../views/offers/editOfferPage.hbs");
            });
        });
    };

    const editOffer = function(context){
        const offerId = context.params.orderId;

        const { product, description, price, pictureUrl } = context.params;

        const editedData = {
            product,
            description,
            price,
            pictureUrl
        };

        requester.put(`offers/${offerId}`, "appdata", "Kinvey", editedData)
        .then(helper.handler)
        .then(() => {
            context.redirect("#/dashboard");
        });
    };

    return {
        getCreateOffer,
        createOffer,
        getDashboard,
        getOfferDetails,
        getDeleteOffer,
        deleteOffer,
        getEditOffer,
        editOffer
    };
}();