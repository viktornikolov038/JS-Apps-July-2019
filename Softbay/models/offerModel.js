const offerModel = function(){

    const createOffer = function(params){
        const { product, description, price, pictureUrl } = params;
        const offerData = {
            product,
            description,
            price,
            pictureUrl
        };

        return requester.post("offers", "appdata", "Kinvey", offerData);
    };
   
    const getOffers = function(){
        return requester.get("offers", "appdata", "Kinvey");
    };

    return {
        createOffer,
        getOffers
    };
}();