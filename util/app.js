var Client = require('ftp');
var Sequelize = require('sequelize');
var models  = require('../api/models');
var dateFormat = require('dateformat');

var rootDir = 'broadwayites.com/anaheim-gazette';
var c = new Client();

var sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

c.on('ready', function() {
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
            var editionDate = new Date(parseInt(nameMatch[2]), parseInt(nameMatch[3]), parseInt(nameMatch[4]));
            var editionName = dateFormat(editionDate, "fullDate");
            //loconsole.log("creating", editionName);
            
            models.edition.create({
              publication_id: 1,
              name: editionName,
              pages: 0,
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

models.edition.truncate().then(function()
{
  c.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD
  });
});