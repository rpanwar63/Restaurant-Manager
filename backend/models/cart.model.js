const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;