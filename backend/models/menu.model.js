const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = new Schema({
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
    available: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;