var express = require('express');
var router = express.Router();

var skPP = require('./sk_pp');
var skPKB = require('./sk_pkb');
var akSatu = require('./ak_satu');

var boilerplate = require('./boilerplate');

const PDFDocument =  require('pdfkit');

router.post('/generatePDFSKPP', async function(req, res, next) {
  skPP.createPDF(req, res, next);
});
router.post('/generatePDFSKPKB', async function(req, res, next) {
  skPKB.createPDF(req, res, next);
});
router.get('/generatePDFAK1', async function(req, res, next) {
  akSatu.createPDF(req, res, next);
});
router.post('/boilerplate', async function(req, res, next) {
  boilerplate.createPDF(req, res, next);
});

module.exports = router;