const router = require('express').Router();
let Menu = require('../models/menu.model');
let Orders = require('../models/orders.model');
let Cart = require('../models/cart.model');

//      Menu
//#region
router.route('/menu').get((req, res) => {
    Menu.find()
    .then(menu => res.json(menu))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/menu').post((req, res) => {
    const newItem = new Menu(req.body);
    newItem.save()
    .then(() => res.json('Item added'))
    .catch(err => res.status(400).json('Error: '+err));
});
//#endregion

//      Cart
//#region 
router.route('/cart').get((req, res) => {
    Cart.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/cart').post((req, res) => {
    Cart.findOne({item_id:req.body.item_id})
    .then(item => 
    {
        item.qty = item.qty+Number(req.body.qty),
        item.total = item.total+Number(req.body.total)
        item.save()
        .then(() => res.json('Item Updated'))
        .catch(err => res.status(400).json('Error: '+err));
    }
    )
    .catch((er) => {
        console.log(er);
        const newItem = new Cart(req.body);
        newItem.save()
        .then(() => res.json('Item added'))
        .catch(err => res.status(400).json('Error: '+err));
    });
});

router.route('/cart/remove').post((req, res) => {
    Cart.findOne({_id:req.body._id})
    .then(item => 
    {
        if(item.qty>1){
            item.qty = item.qty-1,
            item.total = item.total-Number(req.body.total)
            item.save()
            .then(() => res.json('Quantity Decreased'))
            .catch(err => res.status(400).json('Error: '+err));
        }
        else{
            Cart.findByIdAndDelete(req.body._id)
            .then(() => res.json('Item Removed'))
            .catch(err => res.status(400).json('Error: '+err));
        }
    })
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/cart').delete((req, res) => {
    Cart.deleteMany({})
    .then(() => res.json('Cart Empty'))
    .catch(err => res.status(400).json('Error: '+err));
})
//#endregion

//      Orders
//#region 
router.route('/order').get((req, res) => {
    Orders.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/order').post((req, res) => {
    const newOrder = new Orders(req.body);
    newOrder.save()
    .then(() => res.json('Order Placed'))
    .then(() => {
        Cart.deleteMany({})
        .then(() => res.json('Cart Empty'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});
//#endregion

module.exports = router;