const express=require('express')
const {SaveProduct,getProductById,getAllProduct,deleteProduct,updateProduct}=require('../controllers/productControllers')
const router=express.Router()
router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/showProduct',getAllProduct)
router.get('/productadd',(req,res)=>{res.render('addproduct',{errMsg:'',successMsg:''})})
router.post("/save_product",SaveProduct);
router.get("/getproductbyid/:id",getProductById);
router.post("/editproduct/",updateProduct)
router.get("/deleteproduct/:id",deleteProduct);


module.exports=router;
