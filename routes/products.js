var express = require('express');
var router = express.Router();

var database = require('../database');
var productJson = database.products;

/* New Schema to Database */
/* ------------------------------ */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = { title: String,price: String,description: String };
var Products = mongoose.model('Products', userSchema);	

mongoose.connect('mongodb://localhost/Ica-Teste-Produto');


criaDatabase(productJson,Products);
/* ------------------------------ */



router.use((req, res, next) => {
  setTimeout(next, 1000);
});

/* GET products normaly and whithout order by.
router.get('/', function(req, res, next) {    		
	Products.find().lean().exec(function (err, data) {										
		//products=data;		
		if (err){
			console.log("error in get products!");
		}else{	
			res.json(data);       
		}
	});		
	//	res.json(products);       
});*/

/* GET products with Order By Title*/
router.get('/', function(req, res, next) {    		
	
	Products.find({},// Search Filters
				  ['title','description'], // Columns to Return
					{
						skip:0, // Starting Row
						limit:100, // Ending Row
						sort:{
							title: 1 //Sort by Title of Products Added DESC
							}
					},
					function(err,data){
						if (err){
							console.log("error in get products!");
						}else{	
							res.json(data);       
						}
					});		  
});

/* POST new product */
router.post('/', function(req, res, next) {
	var item = new Products({ title: req.body.title,price: "",description: req.body.description }); 
	item.save();	
	//res.json(products);		
	res.redirect('back');
});

/* PUT update product */
router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	Products.findById(id, function (err, OneProduct) {    
		OneProduct.title = req.body.title;
		OneProduct.price = "";//req.body.price;
		OneProduct.description = req.body.description;		
		OneProduct.save(function (err, data) { 
			if (err){
			console.log("error in update!");
			}else{	
				res.json(data);       
		}
		});		  		
		products=OneProduct;	
		
	});			
});

/* DELETE delete product */
router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Products.findByIdAndRemove(id, function (err, data) {    
		if (err){
			console.log("error in delete!");
		}else{	
			res.json(data);       
		}
	});		
});	



module.exports = router;

/*------------- Functions ---------------------*/
function criaDatabase(products,Products){
	
	Products.remove({}, function(err) { 
		console.log('Collection in Database removed;');
	});
	for(var i = 0; i < productJson.length; i++) { 
		 var item = new Products({ title: productJson[i].title,price: productJson[i].price,description: productJson[i].description });
		 item.save();
	}
		console.log('New Database was filled;');
}