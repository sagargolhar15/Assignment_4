const proModel = require('../model/product');
const fs=require('fs')

// save product
function SaveProduct(req, res) {
    var img = req.files.image;
    var img_name = new Date().getTime() + img.name;
    img.mv("./public/upload/" + img_name, function (err) {
    })
    req.body.product_image = img_name;

    const bodyData = req.body;
    let ins = new proModel(bodyData);
    ins.save((err) => {
        if (err) {
            res.render('addproduct', { errMsg: 'Something went to wrong',successMsg:''})
        }
        else {
            res.render('addproduct', { successMsg: 'Product add successfully',errMsg:'' })
        }
    })
}

// get product by id
async function getProductById(req, res) {
    let proId = req.params.id;
    let product = await proModel.findById(proId);
    if (!product) {
        res.status(404).send("Product with id not found");
    }
    res.render("editproduct", product);
}

// get all product
function getAllProduct(req, res) {
    proModel.find({}, (err, data) => {
        if (err) { res.render("showProduct", { errMsg: 'Something went to wrong' }) }
        else {
            res.render("showProduct", { productdata: data})
            
        }
    })
}
// delete a product
async function deleteProduct(req, res) {
    let pid = req.params.id;
    let product = await proModel.findById(pid);
    if (product) {
        fs.unlink('./public/upload/'+product.product_image, function (err) {
            if (err) return console.log(err);
        });
    }
    proModel.deleteOne({ _id: pid }, (err) => {
        if (err) { res.render("showProduct")}
        else {
            res.redirect('/showProduct');
        }
    })
}
function updateProduct(req, res) {
    let pid = req.body.id;
    let formData = req.body;
    if (req.files?.image) {
        fs.unlink('./public/upload/'+formData.img, function (err) {
            if (err) return console.log(err);
        });
        var img = req.files.image;
        var img_name = new Date().getTime() + img.name;
        img.mv("./public/upload/" + img_name, function (err) {
        })
        formData.product_image = img_name;
        proModel.updateOne({ _id: pid }, {
            product_name: formData.product_name,
            product_price: formData.product_price,
            product_d_price: formData.product_d_price,
            product_desc: formData.product_desc,
            product_image: formData.product_image
        }, (err) => {
            if (err) { console.log("Error") }
            else {
                res.send(`<script>
        alert('product update successfully'); 
        window.location.assign('/showProduct')
        </script>`);
            }
        })
    }
    else {
        proModel.updateOne({ _id: pid }, {
            product_name: formData.product_name,
            product_price: formData.product_price,
            product_d_price: formData.product_d_price,
            product_desc: formData.product_desc
        }, (err) => {
            if (err) { console.log("Error", err) }
            else {
                res.send(`<script>
        alert('product update successfully'); 
        window.location.assign('/showProduct')
        </script>`);
            }
        })
    }
}
module.exports = { SaveProduct, getProductById, getAllProduct, deleteProduct, updateProduct };