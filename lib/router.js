var express = require('express');
var router = express.Router();

var skPP = require('./sk_pp');
var skPKB = require('./sk_pkb');

const PDFDocument =  require('pdfkit');

router.post('/generatePDFSKPP', async function(req, res, next) {
  skPP.createPDF(req, res, next);
});
router.post('/generatePDFSKPKB', async function(req, res, next) {
  skPKB.createPDF(req, res, next);
});

module.exports = router;