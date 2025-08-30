import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'user' },
    items: [{
        product: { type: String, required: true, ref: 'product '},
        quantity: { type: Number,requied: true }
    }],
    amount: { type : Number, required: true},
    address: { type:String, ref: 'address', requied: true },
    status: { type: String, ref: true, default: 'Order Placed'},
    date: { type: Number, required: true},
})

const Order = mongoose.models.order || mongoose.model('order', orderSchema)

export default Order