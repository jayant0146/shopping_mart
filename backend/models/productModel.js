import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        requried: true,
    },
    price: {
        type: Number,
        requried: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model('product', productSchema);