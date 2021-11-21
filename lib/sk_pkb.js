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
    font: 'Helvetica',
  });
  let buffers = [];
  docObj.on('data', buffers.push.bind(buffers));
  docObj.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=SK_PKB_.pdf',
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
    .text(`PEMERINTAH KABUPATEN TEMANGGUNG`, 150, 50, {
      width: 350,
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
	/*----- GARIS KOP ------*/
    .moveDown(0.25);
    docObj.moveTo(55, 150)
      .lineTo(600, 150)
      .stroke()
	/*----- ISI SURAT ------*/
      .moveDown(3);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KEPUTUSAN`, {
      align: 'center'
    })
    .moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KEPALA DINAS PERINDUSTRIAN DAN TENAGA KERJA`, {
      align: 'center'
    })
		.moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KABUPATEN TEMANGGUNG`, {
      align: 'center'
    })
		.moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`NOMOR 560/PKB/   /III/2021`, {
      align: 'center'
    })
		.moveDown(1);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`TENTANG`, {
      align: 'center'
    })
		.moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`PENDAFTARAN PERJANJIAN KERJA BERSAMA`, {
      align: 'center'
    })
		.moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`ANTARA CV / PT.`, {
      align: 'center'
    })
		.moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`DENGAN SERIKAT PEKERJA`, {
      align: 'center'
    })
		.moveDown(1);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KEPALA DINAS PERINDUSTRIAN DAN TENAGA KERJA`, {
      align: 'center'
    })
		.moveDown(0.25);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KABUPATEN TEMANGGUNG,`, {
      align: 'center'
    })
		
	/* ----- MEMBACA ----- */
		.moveDown(1);
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`Membaca : `, 70, 370, {
      align: 'left'
    })
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`Surat Direktur [...] Nomor: [...] tanggal [...] perihal [...].`, 130, 370, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`Menimbang : `, 70, 420, {
      align: 'left'
    })
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`a. bahwa Perjanjian Kerja Bersama merupakan salah satu instrumen dalam melaksanakan Hubungan Industrial yang diharapkan dapat menciptakan hubungan kerja yang  harmonis antara pengusaha dan pekerja sebagaimana dimaksud dalam Pasal 103 Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan jo Peraturan Menteri Ketenagakerjaan Nomor 28 Tahun 2014 tentang Tata Cara Pembuatan dan Pengesahan Peraturan Perusahaan serta Pembuatan dan Pendaftaran Perjanjian Kerja Bersama;`, 140, 420, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })  	
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`b.	bahwa Perjanjian Kerja Bersama [...] merupakan cerminan kesepakatan antara Pengusaha dan Serikat Pekerja [...] dalam mempertegas hak dan kewajiban masing-masing pihak;`, 140, 580, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })	
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`c.	bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Dinas Perindustrian dan Tenaga Kerja tentang Pendaftaran Perjanjian Kerja Bersama [...] dengan Serikat Pekerja [...]. `, 140, 640, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
	docObj.addPage({size: 'LETTER'})
		
	// Mengingat
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`Menimbang : `, 70, 120, {
      align: 'left'
    }).moveDown(0.25);
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`1. Undang-Undang Nomor 13 Tahun 1950 tentang Pembentukan Daerah-daerah Kabupaten dalam Lingkungan Provinsi Jawa Tengah; `, 140, 120, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`2. Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan; `, 140, 160, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`3. Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah sebagaimana telah diubah beberapa kali terakhir dengan 
Undang-Undang Nomor 9 Tahun 2015 tentang Perubahan Kedua Atas Undang-Undang Nomor 23 Tahun 2014 tentang 
Pemerintahan Daerah;
`, 140, 190, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`4. Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja;
`, 140, 290, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`5. Peraturan Daerah Kabupaten Temanggung Nomor 27 Tahun 2012 tentang Penyelenggaraan Ketenagakerjaan; 
`, 140, 315, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`6. Peraturan Daerah Kabupaten Temanggung Nomor 24 Tahun 2020 tentang Pembentukan dan Susunan Perangkat Daerah Kabupaten Temanggung;
`, 140, 355, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`7. Peraturan Menteri Ketenagakerjaan Nomor 28 Tahun 2014 tentang Tata Cara Pembuatan dan Pengesahan Peraturan Perusahaan serta Pembuatan dan Pendaftaran Perjanjian Kerja Bersama;  
`, 140, 415, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`8.	Peraturan Bupati Temanggung Nomor 60 Tahun 2016 tentang Kedudukan, Susunan dan Tata Kerja Organisasi Perangkat Daerah Kabupaten Temanggung;   
`, 140, 475, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`9.	Peraturan Bupati Temanggung Nomor 35 Tahun 2017 tentang Tugas dan Fungsi Dinas Tenaga Kerja Kabupaten Temanggung.    
`, 140, 535, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
		docObj.addPage({size: 'LETTER'})
		
		
		//Memutuskan
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`MEMUTUSKAN : `, 70, 120, {
      align: 'center'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`Menetapkan : `, 70, 135, {
      align: 'left'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`KESATU : `, 70, 155, {
      align: 'left'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`Mencatatkan Pendaftaran Perjanjian Kerja Bersama antara [...] dengan Serikat Pekerja [...] dalam Buku Register Pendaftaran Perjanjian Kerja Bersama.  
`, 140, 155, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KEDUA : `, 70, 215, {
      align: 'left'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`Perjanjian Kerja Bersama sebagaimana dimaksud dalam Diktum KESATU Keputusan ini berlaku selama 2 (dua) tahun terhitung  sejak tanggal ditetapkan.   
`, 140, 215, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
  
	  docObj.font('Helvetica')
    .fontSize(12)
    .text(`KETIGA : `, 70, 275, {
      align: 'left'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`Pengusaha [...] dan Serikat Pekerja [...]  wajib memberitahukan isi Perjanjian Kerja Bersama kepada pekerja/buruh. 
`, 140, 275, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`KEEMPAT : `, 70, 320, {
      align: 'left'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`Keputusan Kepala Dinas Perindustrian dan Tenaga Kerja ini mulai berlaku pada tanggal ditetapkan. 
`, 140, 320, {
      align: 'justify',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`Ditetapkan di Temanggung `, 280, 400, {
      align: 'center'
    }).moveDown(0.25);
		
		docObj.font('Helvetica')
    .fontSize(12)
    .text(`pada tanggal 00 Maret 2021
`, 210, 415, {
      align: 'center',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);		
	
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`KEPALA DINAS `, 280, 450, {
      align: 'center'
    }).moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`PERINDUSTRIAN DAN TENAGA KERJA
`, 210, 465, {
      align: 'center',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);		
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`KABUPATEN TEMANGGUNG `, 280, 480, {
      align: 'center'
    }).moveDown(0.25);
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`AGUS SARWONO, S.Sos, MM
`, 210, 545, {
      align: 'center',
			width: 400,
			lineGap: 5,
			underline: true
    })		
    .moveDown(0.25);		
		
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`Pembina Utama Muda
`, 210, 560, {
      align: 'center',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);	
	
	docObj.font('Helvetica')
    .fontSize(12)
    .text(`NIP. 19660411 198607 1 001
`, 210, 575, {
      align: 'center',
			width: 400,
			lineGap: 5
    })		
    .moveDown(0.25);		
  docObj.end();
}

module.exports = lib;