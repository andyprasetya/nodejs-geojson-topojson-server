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
      'Content-disposition': 'attachment;filename=SK_PP_.pdf',
    })
    .end(pdfData);
  });
  /* Masukkan gambar logo daerah - imagesize: 103 x 144 px */
  docObj.image('./data/images/logo-pemda-jpg.jpg', 30, 40, {
    fit: [100, 100], 
    align: 'center', 
    valign: 'center'
  });
  docObj.font('Helvetica')
    .fontSize(16)
    .text(`PEMERINTAH KABUPATEN TEMANGGUNG`, 130, 50, {
      width: 377,
      align: 'center'
    })
    .moveDown(0.25);
  docObj.font('Helvetica-Bold')
    .fontSize(17)
    .text(`DINAS PERINDUSTRIAN DAN TENAGA KERJA`, {
      width: 377,
      align: 'center'
    })
    .moveDown(0.25);
    docObj.font('Times-Roman')
    .fontSize(10)
    .text(`Jalan Gajah Mada No. 76 Telp (0293) 492327 Temanggung`, {
      width: 350,
      align: 'center'
    })
    .moveDown(0.25);
    docObj.font('Times-Roman')
    .fontSize(10)
    .text(`Surat Elektronik: nakertrans_temanggung@yahoo.co.id Laman: disnakertrans.temanggungkab.go.id`, 50, 115,{
      width: 600,
      align: 'center'
    })
    .moveDown(0.25);
    docObj.moveTo(55, 155)
      .lineTo(560, 155)
      .stroke()
      .moveDown(3.5);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`KEPUTUSAN`, {
        align: 'center'
      })
      .moveDown(0.25);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`KEPALA DINAS TENAGA KERJA KABUPATEN TEMANGGUNG`, {
        align: 'center'
      })
      .moveDown(0.25);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`NOMOR : 560/PP/[...]/I/2021`, {
        align: 'center'
      })
      .moveDown(0.25);
    docObj.font('Helvetica')
      .text(`TENTANG`, {
        align: 'center'
      })
      .moveDown(0.25);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`PENGESAHAN PERATURAN PERUSAHAAN`, {
        align: 'center'
      })
      .moveDown(0.25);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`[...]`, {
       align: 'center'
      })
      .moveDown(0.5);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`KEPALA DINAS TENAGA KERJA KABUPATEN TEMANGGUNG,`, {
       align: 'center'
      })
      .moveDown(0.25);
    /* Text */
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Membaca : `, 70, 300, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Surat Direktur [...] Nomor: [...] tanggal [...] perihal [...].`, 130, 300, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Menimbang : `, 70, 320, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(` a. bahwa dalam rangka mewujudkan Hubungan Industrial yang harmonis, diperlukan sarana pengaturan dalam bentuk Peraturan Perusahaan yang mengatur hubungan kerja antara Pengusaha dan Pekerja yang mencerminkan pelaksanaan hak dan kewajiban yang seimbang. Oleh karena itu Peraturan Perusahaan [....] yang telah berakhir masa berlakunya pada tanggal [...] wajib diperbaharui;`, 130, 320, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(``, 70, 430, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`b.	bahwa terhadap Peraturan Perusahaan [...] telah dilakukan penelitian menurut ketentuan sebagaimana diatur dalam Pasal 8 ayat (3) Peraturan Menteri Ketenagakerjaan Nomor 28 Tahun 2014 tentang Tata Cara Pembuatan dan Pengesahan Peraturan Perusahaan serta Pembuatan dan Pendaftaran Perjanjian Kerja Bersama, dan karenanya perlu disahkan;`, 130, 430, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(``, 70, 525, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`c.	bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Dinas Tenaga Kerja Kabupaten Temanggung tentang Pengesahan Peraturan Perusahaan [...];`, 130, 525, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Mengingat :`, 70, 580, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`1. Undang-Undang Nomor 13 Tahun 1950 tentang Pmbentukan Daerah-daerah Kabupaten dalam Lingkungan Provinsi Jawa Tengah; `, 130, 580, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`2. Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan`, 130, 615, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`3. Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah sebagaimana telah diubah beberapa kali terakhir dengan Undang-Undang Nomor 9 Tahun 2015 tentang Perubahan Kedua Atas Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah; `, 130, 633, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`4.	Peraturan Daerah Kabupaten Temanggung Nomor 27 Tahun 2012 tentang Penyelenggaraan Ketenagakerjaan; `, 130, 705, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`5.	Peraturan Daerah Kabupaten Temanggung Nomor 10 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah Kabupaten Temanggung; `, 130, 730, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`6.	Peraturan Menteri Ketenagakerjaan Nomor 28 Tahun 2014 tentang Tata Cara Pembuatan dan Pengesahan Peraturan Perusahaan serta Pembuatan dan Pendaftaran Perjanjian Kerja Bersama;`, 130, 88, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`7.	Peraturan Bupati Temanggung Nomor 60 Tahun 2016 tentang Kedudukan, Susunan dan Tata Kerja Organisasi Perangkat Daerah Kabupaten Temanggung;`, 130, 142, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`8.	Peraturan Bupati Temanggung Nomor 35 Tahun 2017 tentang Tugas dan Fungsi Dinas Tenaga Kerja Kabupaten Temanggung;`, 130, 180, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(1);
    docObj.font('Helvetica')
      .fontSize(12)
      .text(`MEMUTUSKAN:`, 130, 225, {
        align: 'center'
      })
      .moveDown(0.25);
      docObj.font('Helvetica')
    .fontSize(11)
    .text(`KESATU :`, 70, 250, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(` Mengesahkan Peraturan Perusahaan sebagaimana tersebut dibawah ini: `, 130, 250, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Nama Perusahaan : [...]`, 130, 265, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Alamat                    : [...] `, 130, 280, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Jenis usaha            : [...]`, 130, 295, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`KEDUA :`, 70, 315, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(` Peraturan Perusahaan sebagaimana dimaksud dalam Diktum  KESATU Keputusan ini berlaku selama 2 (dua) tahun terhitung  sejak tanggal ditetapkan. `, 130, 315, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`KETIGA :`, 70, 350, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Pengusaha wajib:`, 130, 350, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`a.	memberitahukan dan menjelaskan isi Peraturan Perusahaan  kepada pekerja/buruh ;`, 130, 365, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`b. memberikan Peraturan Perusahaan kepada pekerja/buruh.`, 130, 400, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`KEEMPAT :`, 70, 420, {
      align: 'left'
    })
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Keputusan Kepala Dinas Tenaga Kerja ini mulai berlaku pada tanggal ditetapkan. `, 130, 420, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
     docObj.font('Helvetica')
    .fontSize(11)
    .text(`Ditetapkan di Temanggung`, 375, 470, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`pada tanggal [...]`, 375, 485, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`KEPALA DINAS`, 400, 510, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica-Bold')
    .fontSize(11)
    .text(`AGUS SARWONO, S.Sos, MM `, 375, 580, {
      align: 'justify',
			width: 400,
			lineGap: 5,
      underline: true
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`Pembina Utama Muda `, 390, 600, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
    docObj.font('Helvetica')
    .fontSize(11)
    .text(`NIP. 19660411 198607 1 001`, 380, 620, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
    .moveDown(0.25);
  docObj.end();
}

module.exports = lib;