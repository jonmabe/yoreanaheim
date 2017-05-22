require('babel-register');

var Client = require('ftp');
var Sequelize = require('sequelize');
var models  = require('../api/models');
var dateFormat = require('dateformat');
var pdf2json = require('pdf2json');
var request = require('request').defaults({ encoding: null });

var c = new Client();

var sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

console.log(process.argv);

var configSlug = process.argv[2];

var publication_configs = {
	'anaheim-gazette': {
		ftp_slug: 'anaheim-gazette',
		publication_id: 1,
	},
	'anaheim-bulletin': {
		ftp_slug: 'anaheim-bulletin',
		publication_id: 2,
	},
	'oc-plain-dealer': {
		ftp_slug: 'oc-plain-dealer',
		publication_id: 3,
	},
	'anaheim-daily-herald': {
		ftp_slug: 'anaheim-daily-herald',
		publication_id: 4,
	}
}

var publication_config = publication_configs[configSlug];
console.log(publication_config);

c.on('ready', function() {
	var rootDir = 'media.yoreanaheim.com/'+ publication_config.ftp_slug;
  c.list(rootDir, function(err, list) {
    if (err) throw err;

    list.forEach(function(yearItem){
      if(yearItem.type != 'd') return;
      var path = rootDir +"/"+ yearItem.name;

      //console.log("working on", yearItem.name, yearItem);

      c.list(path, function(err, list) {
        list.forEach(function(editionItem){
          if(editionItem.type != '-') return;
          var re = /(\w{2})-(\d{4})-0*(\d{1,2})-0*(\d{1,2})\.pdf/i;
          var path = "http://"+ rootDir +"/"+ yearItem.name +"/"+ editionItem.name;
          var nameMatch = re.exec(editionItem.name);
          if(nameMatch != null){
            var editionDate = new Date(parseInt(nameMatch[2]), parseInt(nameMatch[3]) - 1, parseInt(nameMatch[4]));
            var editionName = dateFormat(editionDate, "fullDate");
						var pages = 1;
						/*
						var pdfParser = new pdf2json();

						pdfParser.on('pdfParser_dataReady',  pdfData => {
					    //console.log('Number of pages:', pdfData.formImage.Pages.length);
							var pages = pdfData.formImage.Pages.length;
							console.log('pages', pages, path);
						});
						//pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
						request.get(path, function (err, response, buffer) {
							pdfParser.parseBuffer(buffer);
						});
						*/
            //loconsole.log("creating", editionName);


						models.edition.create({
              publication_id: publication_config.publication_id,
              edition_date: editionDate,
              name: editionName,
              pages: pages,
              pdf: path,
              edition_number: null,
              notes: null,
              text_content: null
            });

          } else {
            console.log("Couldn't Parse", editionItem);
          }
        });
      });
    });

    c.end();
  });
});


//console.log(process.env.FTP_HOST + ":" + process.env.FTP_USERNAME + ":" + process.env.FTP_PASSWORD);
models.edition.destroy({ where: { publication_id: publication_config.publication_id }}).then(function()
{
  c.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD
  });
});
