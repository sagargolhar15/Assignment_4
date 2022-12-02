const mongoose=require('mongoose');
const proSchema=new mongoose.Schema({
    product_name:{ type:String,unique:true,required:true},
    product_price:{ type:Number, required:true},
    product_d_price:{ type:Number, required:true},
    product_desc:{ type:String,required:true},
    product_image:{type:String,required:true},
    created_at:{ type:Date, default: Date.now}
})
module.exports=mongoose.model("product",proSchema);