
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var picha = require('../index.js');

describe('codec', function() {
	var image;
	describe("decode", function() {
		var jpegFile, pngFile;
		it("should load test jpeg", function(done) {
			fs.readFile(path.join(__dirname, "test.jpeg"), function(err, buf) {
				jpegFile = buf;
				done(err);
			});
		});
		it("should load test png", function(done) {
			fs.readFile(path.join(__dirname, "test.png"), function(err, buf) {
				pngFile = buf;
				done(err);
			});
		});
		it("jpeg should stat correctly", function() {
			var jpegStat = picha.stat(jpegFile);
			assert.notEqual(jpegStat, null);
			assert.equal(jpegStat.width, 50);
			assert.equal(jpegStat.height, 50);
			assert.equal(jpegStat.pixel, 'rgb');
			assert.equal(jpegStat.mimetype, 'image/jpeg');
		});
		it("png should stat correctly", function() {
			var pngStat = picha.stat(pngFile);
			assert.notEqual(pngStat, null);
			assert.equal(pngStat.width, 50);
			assert.equal(pngStat.height, 50);
			assert.equal(pngStat.pixel, 'rgba');
			assert.equal(pngStat.mimetype, 'image/png');
		});
		it("should jpeg async decode", function(done) {
			picha.decode(jpegFile, function(err, image) {
				done(err);
			});
		});
		it("should png async decode", function(done) {
			picha.decode(pngFile, function(err, image) {
				done(err);
			});
		});
	})
})
