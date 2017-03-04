'use strict';

angular
  .module('icaApp')
  .factory('appService', ["$http", appService]);

function appService($http) {
  return {
    list: list,
    create: create,
    edit: edit,	
	find: find,
    remove: remove
  }

  function list() {	  
    return $http.get("/products")
    .then(response => {
      return response.data;
    });
  }

  function create(product) {
    return $http.post("/products",product)	
    .then(response => {			  
      return response.data;
    });
  }

  function edit(product) {
    return $http.put("/products/"+product._id,product)
    .then(response => {		
      return response.data;
    });
  }  

  function remove(product) {	  
    return $http.delete("/products/"+product._id)	
    .then(response => {		
      return response.data;
    });
  }    
}