const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      minlength: 10,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required:true
    },
    size: {
      type: Number,
      required:true
    },
    color:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default:""
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
