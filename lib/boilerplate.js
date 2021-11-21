var dbConnection = require('./dbconnect');

const PDFDocument =  require('pdfkit');

var lib = {};

lib.createPDF = function(req, res, next){
  var docObj = new PDFDocument({
    bufferPages: true, 
    margins: {
      top: 50, 
      right: 64,
      bottom: 50,
      left: 64
    },
    font: 'Helvetica'
  });
  let buffers = [];
  docObj.on('data', buffers.push.bind(buffers));
  docObj.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=BoilerplatePDF.pdf',
    })
    .end(pdfData);
  });
  
  docObj.end();
}

module.exports = lib;