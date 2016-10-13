/*
* @Author: Marco Ferreira
* @Date:   2016-10-11 18:00:40
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-13 04:38:08
*/

'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	_ 		= require('lodash'),
	utils 	= require('./utils'),
	errors 	= require('./errors');



function startService(data) {
	// cache
	var carparkData = data;
	var app = express();

	//CORS middleware
	var allowCrossDomain = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'Content-Type');
	    next();
	}
	app.use(allowCrossDomain);
	app.use(bodyParser.json()); // for parsing application/json

	app.get('/', function(req, res) {
		res.send("Well, hello there!");
	})

	app.get('/parkinglots', function (req, res) {
		res.send(carparkData);
	})

	app.get('/parkinglots/:lotid/cars/:hours', function(req, res) {
		console.log(JSON.stringify(req.params));

		if (/[^0-9]/.test(req.params.lotid) || /[^0-9]/.test(req.params.hours)) {
			res.status(400).send("Invalid parameters");
		}

		else {
			var payload = carparkData.filter(function(obj){
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
		}

	});

	app.get('/inventory/:hours', function(req, res) {
		if (/[^0-9]/.test(req.params.hours)) {
			res.status(400).send("Invalid parameters");
		}

		else {
			var payload = _.reduce(carparkData, function(result, value, key) {
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
		}
	});

	app.post('/parkinglots/:lotid/cars', function(req, res){
		console.log(req.body);
		if (/[^0-9]/.test(req.params.lotid) || _.difference(_.keys(req.body), ['brand', 'licenseplate', 'parkingtime']).length) {
			res.status(400).send("Invalid parameters");
		}
		else {
			carparkData.push(_.extend(req.body, {parkinglotid: req.params.lotid}))
			console.log(carparkData)
			res.sendStatus(200);
		}
	});

	app.listen(3000, function () {
		console.log('CarPark app listening on: http://localhost:3000');
	});
}

function startApp(err, data) {
	console.log(data)

	switch (err) {
		case errors.LOT_FULL:
			console.log('ERROR: One or more lots exceed capacity of 23');
			process.exit(1);
			break;
		default:
			startService(data);
			break;
	}

}


// check for xml file input and parse it
if (process.argv.length > 2) {
	utils.parseXML(process.argv[2], startApp)
}
else {
	console.log('ERROR: give me a file')
}
