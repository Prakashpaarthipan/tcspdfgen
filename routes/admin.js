var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var sysdate = new Date();    
    var date = moment(sysdate).format('DD/MM/YYYY HH:mm');
    var logfile = moment(sysdate).format('DD-MM-YYYY');
    var month = moment(sysdate).format('MM');
    var ReplaceTime= date.replace(/[^0-9]/gi, '');
    res.cookie('Times',ReplaceTime, {expire: 360000 + Date.now()}); 
    var writeStream = fs.createWriteStream(logfile+".txt",{flags: 'a'});
    writeStream.write(month+"::"+ReplaceTime+"\n");  
    writeStream.end();
    res.send('respond with a resource : - '+ReplaceTime+' '+req.cookies.Times);
  });
  
  module.exports = router;