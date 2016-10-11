/*
* @Author: Marco Ferreira
* @Date:   2016-10-11 18:00:40
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-11 18:41:03
*/

'use strict';

var utils = require('./utils');

if (process.argv.length > 2)
	utils.parseXML(process.argv[2])
else
	console.log('ERROR: give me a file')
