'use strict';

angular
  .module('icaApp')
  .controller('appController', 
    ['appService', '$scope', '$rootScope', '$timeout', '$window', '$mdToast', '$mdDialog', appController]);

function appController(appService, $scope, $rootScope, $timeout, $window, $mdToast, $mdDialog) {
  $scope.loading = false; 
  
  
  /*-Check if it is the last product and add in page-*/
	var limit = 5;
	$scope.loadMore = (products) => {	
		  products.limit = products.limit + 5;
		  limit = products.limit;		  
		  products.last = loadmore(limit,products);		  		  		  		  		  
		  $scope.products = products;		  		  
	};
  /*------------  Delete from Database -----------*/
  /*------Popup Button Code to Confirm and Delete-----*/
  $scope.status = '  ';
  $scope.customFullscreen = false;    
  $scope.showConfirm = function(ev,product) {    
    var confirm = $mdDialog.confirm()
          .title('Deleting product...')
          .textContent('Are you sure you want to delete this product?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
		/*Delete product in router here:  */
				return appService.remove(product)
				.then(product => {
				  $mdToast.show($mdToast.simple().textContent("Product removed"));
				})
				.catch(err => {
				  $mdToast.show($mdToast.simple().textContent(err));
				})
				.finally(() => { 
					/*Update list automatic*/
					return appService.list()
					.then(products => {
					  products.last = loadmore(limit,product);
					  products.limit = limit;	
					  $scope.products = products;      	  
					})
					.catch(err => {
					  $mdToast.show($mdToast.simple().textContent(err));
					})
					.finally(() => { $scope.loading = false; });
					/*End Update*/
				$scope.loading = false; });
    }, function() {   /* No */	 });
  };
  
  /*------------  List from Database -----------*/
  $scope.getProducts = () => {
    $scope.loading = true;
    return appService.list()
    .then(products => {
	   products.last = 0;
	   limit=0;
	   products.limit = 5;
      $scope.products = products;      	  
    })
    .catch(err => {
      $mdToast.show($mdToast.simple().textContent(err));
    })
    .finally(() => { $scope.loading = false; });
  }
  /*------------  Add to Database -----------*/
  $scope.addProduct = product => {
    $scope.loading = true;	
    return appService.create(product)	
    .then(product => {			
      $mdToast.show($mdToast.simple().textContent("Product created"));	  				
    })
    .catch(err => {
      $mdToast.show($mdToast.simple().textContent(err));
    })
    .finally(() => { 
		/*Update list automatic*/
		return appService.list()
		.then(products => {
		  products.last = loadmore(limit,products);
	      products.limit = limit;	
		  $scope.products = products;      	  
		})
		.catch(err => {
		  $mdToast.show($mdToast.simple().textContent(err));
		})
		.finally(() => { $scope.loading = false; });
		/*End Update*/
	$scope.loading = false; });
  }
  
   /*------------  Edit to Database -----------*/
  $scope.editProduct = product => {
    $scope.loading = true;			
    return appService.edit(product)
    .then(product => {
      $mdToast.show($mdToast.simple().textContent("Product edited"));	  
    })
    .catch(err => {
      $mdToast.show($mdToast.simple().textContent(err));
    })
    .finally(() => { 
	/*Update list automatic*/
		return appService.list()
		.then(products => {
		  products.last = loadmore(limit,product);
	      products.limit = limit;
		  $scope.products = products;      	  
		})
		.catch(err => {
		  $mdToast.show($mdToast.simple().textContent(err));
		})
		.finally(() => { $scope.loading = false; });
		/*End Update*/
	$scope.loading = false; });
  }
 
/*------------  Remove from Database NO MORE USED----------- 
    $scope.removeProduct = product => {
    $scope.loading = true;				
    return appService.remove(product)
    .then(product => {
      $mdToast.show($mdToast.simple().textContent("Product removed"));
    })
    .catch(err => {
      $mdToast.show($mdToast.simple().textContent(err));
    })
    .finally(() => { $scope.loading = false; });
  }*/
     
    
}

function loadmore(limit,products){ 
		  console.log(products.length+" "+limit);
		  if (products.length>limit){
			return 0;
		  }			
		  else{ 
		    return 1;
		  }		  
}


