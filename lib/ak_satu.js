var dbConnection = require('./dbconnect');

const PDFDocument =  require('pdfkit-table');

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
    font: 'Helvetica',
    size: 'LEGAL',
    layout: 'landscape'
  });
  let buffers = [];
  docObj.on('data', buffers.push.bind(buffers));
  docObj.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=AK_1_.pdf',
    })
    .end(pdfData);
  });
  /* Code here */
  docObj.image('./data/images/logo-pemda-jpg.jpg', 30, 40, {
    fit: [100, 100], 
    align: 'center', 
    valign: 'center'
  });
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`AK/1`, 260, 50, {
      width: 377,
      align: 'center'
    })
    .moveDown(0.25);
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`PEMERINTAH KABUPATEN TEMANGGUNG`, 100, 70, {
      width: 377,
      align: 'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica-Bold')
    .fontSize(12)
    .text(`DINAS PERISNDUSTRIAN DAN TENAGA KERJA`, 100, 85, {
      width: 377,
      align: 'center'
    })
    .moveDown(0.25);
    docObj.font('Times-Roman')
    .fontSize(10)
    .text(`Jalan GajahMada No. 76 Temanggung 56221 Telp (0293) 491949 `, 100, 100, {
      width: 377,
      align: 'center'
    })
    .moveDown(0.25);
     docObj.font('Helvetica-Bold')
    .fontSize(13)
    .text(`KARTU TANDA BUKTI PENDAFTARAN PENCARI KERJA`, 105, 115, {
      width: 377,
      align: 'center',
      underline: true
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`No. Pendf. Pencaker`, 200, 150, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`No. Kependudukan`, 200, 170, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`NANA LENGKAP`, 200, 195, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`TMP/TGL LAHIR`, 200, 215, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`JENIS KELAMIN`, 200, 235, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`STATUS`, 200, 255, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`AGAMA`, 200, 275, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`ALAMAT`, 200, 295, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 150, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 170, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 195, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 215, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 235, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 255, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 275, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 315, 295, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 150, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 170, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 195, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 215, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 235, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 255, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 275, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`:`, 305, 295, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`PENDIDIKAN FORMAL`, 500, 50, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`No. `, 500, 70, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Tingkat Pend`, 520, 70, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Jurusan`, 645, 70, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`1. `, 500, 85, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`2. `, 500, 100, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`3. `, 500, 115, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 85, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 100, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 115, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 645, 115, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 645, 85, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 645, 100, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`4. `, 500, 130, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`5. `, 500, 145, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`6. `, 500, 160, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 130, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 145, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 160, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 645, 130, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 645, 145, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 645, 160, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Thn. Lulus`, 815, 70, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 145, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 85, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 100, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 115, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 130, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 160, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`PENDIDIKAN NON FORMAL / KETERAMPILAN / PENGALAMAN KERJA`, 500, 185, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`No.`, 500, 200, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`1. `, 500, 215, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Jenis.`, 520, 200, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`2. `, 500, 230, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`3. `, 500, 245, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 215, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 230, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 520, 245, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Tahun`, 815, 200, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 215, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 230, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 815, 245, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`Pengantar Kerja / Petugas Antar Kerja`, 700, 310, {
      width: 377
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`[...]`, 720, 370, {
      width: 377,
      underline:true
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`NIP. [...]`, 720, 385, {
      width: 377
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Tandatangan`, 130, 385, {
      width: 377
    })
    .moveDown(0.25);
    
    docObj.rect(55, 150, 128, 152);
    docObj.stroke();
    docObj.font('Helvetica-Bold')
    .fontSize(13)
    .text(`Laporan`, 90, 550, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Pertama`, 80, 115, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Kedua`, 80, 160, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Ketiga`, 80, 210, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica-Bold')
    .fontSize(13)
    .text(`Tgl - Bl - Th`, 200, 50, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 180, 115, {
      width: 110,
      align:'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 180, 160, {
      width: 110,
      align:'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 180, 210, {
      width: 110,
      align:'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica-Bold')
    .fontSize(13)
    .text(`Tanda tangan Pengantar Kerja / petugas pendaftar     ( Cantumkan Nama dan NIP )`, 320, 50, {
      width: 200,
      align: 'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 320, 115, {
      width: 200,
      align:'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 320, 160, {
       width: 200,
      align:'center'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 320, 210, {
       width: 200,
      align:'center'
    })
    .moveDown(0.25);
    //kotak 1 begin
      docObj.moveTo(55, 100)
      .lineTo(560, 100)
      .stroke()
      docObj.moveTo(55, 140)
      .lineTo(560, 140)
      .stroke()
      docObj.moveTo(55, 190)
      .lineTo(560, 190)
      .stroke()
      docObj.rect(55, 35, 505, 210);
    docObj.stroke();
    docObj.moveTo(175, 35)
      .lineTo(175, 245)
      .stroke()
      docObj.stroke();
    docObj.moveTo(295, 35)
      .lineTo(295, 245)
      .stroke()
      //kotak 1 end
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Diterima kerja`, 80, 310, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Terhitung tgl`, 80, 350, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`:`, 165, 310, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`:`, 165, 350, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 175, 310, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`[...]`, 175, 350, {
      width: 377,
    })
    .moveDown(0.25);
    //kotak 2 begin
    docObj.rect(55, 280, 505, 110);
    docObj.stroke();
    //kotak 2 end
    docObj.font('Helvetica-Bold')
    .fontSize(13)
    .text(`Ketentuan :`, 600, 85, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`1.`, 620, 115, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`2.`, 620, 160, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`3.`, 620, 210, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`4.`, 620, 275, {
      width: 377,
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Berlaku nasional`, 635, 115, {
      width: 340,
      align: 'justify'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Bila ada perubahan data / keterangan lainya atau telah mendapat pekerjaan harap segera melapor.`, 635, 160, {
      width: 340,
      align: 'justify'
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(13)
    .text(`Apabila pencari kerja yang bersangkutan telah diterima bekerja maka Instansi / Perusahaan yang menerima agar mengembalikan AK/1 ini ke Dinas Tenaga Kerja.`, 635, 210, {
      width: 340,
      align: 'justify'
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(13)
    .text(`Kartu ini berlaku selama 2 tahun dengan keharusan melapor setiap 6 bulan sekali bagi pencari kerja yang belum mendapatkan pekerjaan.`, 635, 275, {
      width: 340,
      align: 'justify'
    })
    .moveDown(0.25);
    //kotak 3 begin
    docObj.rect(580, 70, 410, 280);
    docObj.stroke();
    //kotak 3 end
  /* End of code.. */
  docObj.end();
}

module.exports = lib;