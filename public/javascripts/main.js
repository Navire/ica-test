var angular = require('angular');
require('angular-material');

var app = angular.module('icaApp', ['ngMaterial']);

require('./controllers/appController.js');
require('./services/appService.js');
