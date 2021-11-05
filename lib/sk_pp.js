var dbConnection = require('./dbconnect');

const PDFDocument =  require('pdfkit');

var lib = {};

lib.createPDF = function(req, res, next){
  var docObj = new PDFDocument({bufferPages: true});
  let buffers = [];
  docObj.on('data', buffers.push.bind(buffers));
  docObj.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=SK_PP_.pdf',
    })
    .end(pdfData);
  });
  docObj.font('Times-Roman')
    .fontSize(12)
    .text(`this is a test text`);
  docObj.end();
}

module.exports = lib;