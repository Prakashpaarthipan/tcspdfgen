var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs');

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
    debugger;
    console.log("TESTSEST");   
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
  module.exports = router;