var request = require("request");
var fs = require('fs');

const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap, take } = require('rxjs/operators');
const { interval } = require('rxjs/observable/interval');


var pidName = 'pizza'
var pids = require('./infos/bcn'+pidName+'.json')

console.log(pids.length);

// var request = require("request");
var place_details = [];

var intervalo = interval(5000);

intervalo.pipe(take(pids.length)).subscribe(tempo=>{

console.log(pids[tempo])

var key = require('./key.json')


// for(let i = 0;i<pids.length;i++){
    var options = { method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/details/json',
    qs: 
     { placeid: pids[tempo]['place_id'],
       key: key },
    headers: 
     { 'postman-token': '4956dbfa-5acf-e83c-a8fa-331a62303747',
       'cache-control': 'no-cache' } };
  
  request(options, function (error, response, bodyID) {
    if (error) throw new Error(error);
          var body2 = JSON.parse(bodyID);
          console.log(body2);
          
          var name = body2.result['name']
          var endereco = body2.result['vicinity']
          var phone = body2.result['international_phone_number']
          var site = body2.result['website']
        // console.log(site);
          place_details.push({name: name, phone: phone, site: site, endereco: endereco})
        //   console.log(place_details);
    // console.log(body);
    fs.writeFile("places/bcn"+pidName+".json", JSON.stringify(place_details), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
  });

})
  
// }



