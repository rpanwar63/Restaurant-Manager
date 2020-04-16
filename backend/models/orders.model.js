const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ordersSchema = new Schema({
    items: {
        type: Array
    },
    total: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;