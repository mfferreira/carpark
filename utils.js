/*
* @Author: Marco Ferreira
* @Date:   2016-10-11 18:33:10
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-11 18:35:02
*/

'use strict';


var fs = require('fs'),
    xml2js = require('xml2js');

function parseXML(filename) {
	var parser = new xml2js.Parser();
	fs.readFile(__dirname + filename, function(err, data) {
	    parser.parseString(data, function (err, result) {
	        console.log(JSON.stringify(result, null, 2));
	    });
	});
}

module.exports = {
	parseXML: function(filename) {
		return parseXML((filename[0] !== '/'? '/':'') + filename)
	}
}
