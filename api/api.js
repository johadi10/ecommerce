var router= require("express").Router();
var async=require("async");
var faker=require("faker");
var Category=require("../schemas/category");
var Product=require("../schemas/product");

router.get("/:name",function(req,res,next){
    async.waterfall([
        function(callback){
            Category.findOne({name:req.params.name.toLowerCase()},function(err,result){
                if(err) return next(err);
                callback(null,result);
            });
        },
        function(result,callback){
            for(var i=0;i<10;i++){
                var product=new Product();
                product.category=result._id;
                product.name=faker.commerce.productName();
                product.price=faker.commerce.price();
                product.image=faker.image.image();

                product.save();
            }
        }
    ]);
    res.json({message:"Success"});
});
module.exports=router;
