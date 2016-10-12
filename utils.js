/*
* @Author: Marco Ferreira
* @Date:   2016-10-11 18:33:10
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-11 23:00:50
*/

'use strict';

var fs 		= require('fs'),
    xml2js 	= require('xml2js'),
    _ 		= require('lodash'),
    config 	= require('./config');

var ERR = {
	LOT_FULL: 10
}

function checkData(data, cb) {
	var lots = {}, err = null;
	data = data.cars.car.map(function(obj){
		lots = _.update(lots, "lot"+obj.$.parkinglotid, function(n) {
			return n ? n + 1 : 1;
		});
		if (lots["lot"+obj.$.parkinglotid] > 23)
			err = ERR.LOT_FULL;
		return obj.$;
	});
	cb(err, data);
}

function parseXML(filename, cb) {
	var parser = new xml2js.Parser();
	fs.readFile(__dirname + filename, function(err, data) {
	    parser.parseString(data, function (err, result) {
	        // console.log(JSON.stringify(result, null, 2));
	        checkData(result, cb)
	    });
	});
}

function calcValue(hours) {
	var calc = config.HOUR_PRICE * hours;
	return Math.round(calc * 1e2) / 1e2;
}

function calcDiscount(hours) {
	var calc = (hours - (hours % config.DISCOUNT_HOURS)) / config.DISCOUNT_HOURS * config.HOUR_DISCOUNT;
	return Math.round(calc * 1e2) / 1e2;
}

function calcDiscountInCents(hours) {
	return calcDiscount(hours) * 100;
}


module.exports = {
	ERR: ERR,
	parseXML: function(filename, cb) {
		console.log('Parsing XML file:', filename)
		return parseXML((filename[0] !== '/'? '/':'') + filename, cb)
	},
	calcValue: calcValue,
	calcDiscount: calcDiscount,
	calcDiscountInCents: calcDiscountInCents
}
