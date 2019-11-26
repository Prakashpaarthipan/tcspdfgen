var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs');
const puppeteer = require('puppeteer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.name);
    var sysdate = new Date();    
    var date = moment(sysdate).format('DD/MM/YYYY HH:mm');
    var file = moment(sysdate).format('DD-MM-YYYY');
    var month = moment(sysdate).format('MM');
    var ReplaceTime= date.replace(/[^0-9]/gi, '');
    
    var logfile = file+""+req.query.name+".txt";
    var writeStream = fs.createWriteStream("uploads/"+logfile,{flags: 'a'});
    writeStream.write(month+"::"+ReplaceTime+"\n");  
    writeStream.end();
    setTimeout(function(){
       fs.copyFile("uploads/"+logfile, "public/txtfiles"+logfile, (err) => {
      if (err) throw err;      
    });
    },2000);
   
    res.send('respond with a resource : - '+month+'::'+ReplaceTime+'\n');
  });
  router.get('/listall', function(req, res, next) { 
  
        //passsing directoryPath and callback function
        fs.readdir('uploads', function (err, files) {
          //handling error
          if (err) {
              return console.log('Unable to scan directory: ' + err);
          } 
          //listing all files using forEach
          files.forEach(function (file) {
              // Do whatever you want to do with the file             
              res.render('listfiles', { list: files });
              next();
          });
        });           
  });
  router.get('/genpdf', function(req, res, next) { 
    var reqid = req.body.reqid;
    var year = req.body.year;
    var rsrid = req.body.rsrid;
    var creid = req.body.creid;
    var typeid = req.body.typeid;
    var test = req.body.test;
    async function createNew()
    {
      var Filename = reqid+"_"+year+"_"+test+"_AP.pdf";
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const URL = 'http://www.tcsportal.com/approval-desk/print_request_open.php?action=print&reqid='+reqid+'&year='+year+'&rsrid=1&creid='+creid+'&typeid='+typeid;
  const URL2 = 'http://www.avanthi.edu.in/portal/login.php';
  const URL3 = 'https://portal.thechennaisilks.com//approval-desk/print_request_open.php?action=print&reqid='+reqid+'&year='+year+'&rsrid=1&creid='+creid+'&typeid='+typeid;
  await page.goto(URL2, {waitUntil: 'load', timeout: 0});
  await page.pdf({path: 'uploads/'+Filename, format: 'A4'});
  await browser.close(); 
  res.status(200);
  res.send("Created");
    }
    createNew();
});
  module.exports = router;