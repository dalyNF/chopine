const stripe = require('stripe')('sk_test_WvJOfwZp9WEwNygwuHXgiwLX');
const withAuth = require('../withAuth');

module.exports = function (app, db) {
    const orderModel = require('../models/OrderModel')(db);
	const beerModel = require('../models/BeerModel')(db);
    
    //route de sauvegarde d'une commande
    app.post('/api/v1/order/save', withAuth, async (req, res, next)=>{
        //on initialise un montant total à 0
        let totalAmount = 0;
        // enregistrement de l'order
        let orderInfos = await orderModel.saveOneOrder(req.body.user_id, totalAmount)
        
        if(orderInfos.code){
            res.json({status: 500, msg: orderInfos})
        }
        //on récupère l'id du nouvel élément qui vient d'être ajouté (insertId)
        let id = orderInfos.insertId;
        // enregistrement des orderdetails (boucle sur le panier (req.body.basket)
        req.body.basket.map(async (b, index)=>{
            //récup des infos de la bière par son id (fonction)
            let beer = await beerModel.getOneBeers(b.id);
            if(beer.code){
                res.json({status: 500, msg: beer})
            }
            //on stock dans l'objet une nouvelle propriété du prix
            b.safePrice = parseFloat(beer[0].price);
            //appel de la fonction d'enregistrement du détail de la bière
            let detail = await orderModel.saveOneOrderDetail(id, b);
            if(detail.code){
                res.json({status: 500, msg: detail})
            }
            //calcul du prix total pour ce produit par rapport à la quantité demandée
            totalAmount += parseInt(b.quantityInCart) * parseFloat(b.safePrice);
            //appel de la fonction de mise à jour du montant total
            let update = await orderModel.updateTotalAmount(id, totalAmount);
            if(update.code){
                res.json({status: 500, msg: update})
            }
        })    
        //rep json positive en retournant l'id de la commande
        res.json({status: 200, orderId:id})
    })
        
        
        
        //route de gestion du paiement (je vais gérer)
        app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
            //je récupère ma commande qui pour le moment est en status non payé
            let order = await orderModel.getOneOrder(req.body.orderId);
            //on lance une tentative de paiement paiement (suivi de validité)
            const paymentIntent = await stripe.paymentIntents.create({
    	        amount: order[0].totalAmount* 100,
    	        currency: 'eur',
    	        // Verify your integration in this guide by including this parameter
    	        metadata: {integration_check: 'accept_a_payment'},
    	        receipt_email: req.body.email,
	        });
            //on retourne la réponse de la tentative de paiement vers le front (clé crypté venant de l'api stripe)
            //Ces données bancaires sont crypté car c'est obligatoire et sensible nous n'avons à aucun moment la possibilité d'interagir dans la procédure de paiment.
            res.json({client_secret: paymentIntent['client_secret']})
            
        })
        
        
        //route de validation du paiement dans un order
        app.put('/api/v1/order/validate', withAuth, async (req, res, next)=>{
            //mise à jour du status du paiement de la commande
            let validate = await orderModel.updateStatus(req.body.orderId, req.body.status)
            if(validate.code){
                res.json({status: 500, msg: validate})
            }
            //rep json positive
            res.json({status: 200, msg: "paiement validé"})
        })
}