/*
* @Author: Marco Ferreira
* @Date:   2016-10-11 18:00:40
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-11 20:45:24
*/

'use strict';

var express = require('express'),
	_ 		= require('lodash'),
	utils 	= require('./utils');


function startApp(data) {
	utils.carparkData = data.cars.car.map(function(obj){
		return obj.$;
	});
	console.log(utils.carparkData)

	var app = express();

	app.get('/parkinglots/:lotid/cars/:hours', function(req, res) {
		var payload = utils.carparkData.filter(function(obj){
			// get all cards parked in 'lotid'
			return obj.parkinglotid === req.params.lotid
		}).map(function(obj){
			// add 'discountInCents' and 'value' keys, and omit 'parkinglotid'
			return _.assign(_.omit(obj, ['parkinglotid']), {
				value: parseFloat(utils.calcValue(req.params.hours)).toFixed(2),
				discountInCents: utils.calcDiscountInCents(req.params.hours)
			});
		});
		res.send(payload);
	});

	app.get('/inventory/:hours', function(req, res) {
		var payload = _.reduce(utils.carparkData, function(result, value, key) {
			result.totalAmountOfCars += 1;
			result.value += utils.calcValue(req.params.hours);
			result.discountInCents += utils.calcDiscountInCents(req.params.hours);
			return result;
		}, {
			"totalAmountOfCars": 0,
			"value": 0,
			"discountInCents": 0
		});
		payload.value = parseFloat(payload.value).toFixed(2);
		res.send(payload);
	});

	app.listen(3000, function () {
		console.log('CarPark app listening on port 3000!');
	});
}


// check for xml file input and parse it
if (process.argv.length > 2) {
	utils.parseXML(process.argv[2], startApp)
}
else {
	console.log('ERROR: give me a file')
}
