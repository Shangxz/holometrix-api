

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var faceRec = express.Router();


var objectname = "";
//

router.post('/', function(req, res) {

        //console.log(req.body);
        //res.json(req.body);

        objectname = "";

        var options = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze',
        qs: 
        { visualFeatures: 'Categories,tags,faces,description',
            language: 'en' },
        headers: 
        { 'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '19a88d6de741408eadf0734508969723' },
        body: { url : req.body },
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        objectname  = objectname +  body.categories[0].name;

        console.log(objectname);

        //res.json(objectname);

        });

        /////////////////////// OCR API CALL /////////////////////////////////////
        console.log("ocr api call ");

        var options1 = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation =true',
        headers: 
        { 'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '19a88d6de741408eadf0734508969723' },
        body: { url : req.body },
        json: true };

        request(options1, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body.regions[0]);

        for (var k in body.regions[0].lines){
            console.log(k.text);
            //objectname = objectname + k.words[0].text;
            //console.log(objectname);
        }
        
        console.log(objectname);

        res.json(objectname);

        });

});

faceRec.post('/', function(req, res) {

        console.log(req.body);
        //res.json(req.body);
        
        var request = require("request");

        var options = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
        qs: 
        { visualFeatures: 'Categories,tags,faces,description',
            language: 'en' },
        headers: 
        { 'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': 'ea327b22678947ba8301895feda4cecc' },
        body: { url : req.body },
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(body);

        });

        var options1 = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
        qs: 
        { visualFeatures: 'Categories,tags,faces,description',
            language: 'en' },
        headers: 
        { 'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': 'ea327b22678947ba8301895feda4cecc' },
        body: { url : req.body },
        json: true };

});





app.use('/api', router);
faceRec.use('/face', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);