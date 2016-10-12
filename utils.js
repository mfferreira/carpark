/*
* @Author: Marco Ferreira
* @Date:   2016-10-11 18:33:10
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-11 20:45:24
*/

'use strict';

var fs 		= require('fs'),
    xml2js 	= require('xml2js'),
    config 	= require('./config');

function parseXML(filename, cb) {
	var parser = new xml2js.Parser();
	fs.readFile(__dirname + filename, function(err, data) {
	    parser.parseString(data, function (err, result) {
	        // console.log(JSON.stringify(result, null, 2));
	        if (cb)
	        	cb(result)
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
	parseXML: function(filename, cb) {
		console.log('Parsing XML file:', filename)
		return parseXML((filename[0] !== '/'? '/':'') + filename, cb)
	},
	carparkData: null,
	calcValue: calcValue,
	calcDiscount: calcDiscount,
	calcDiscountInCents: calcDiscountInCents
}
