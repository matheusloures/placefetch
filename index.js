//after this go to readfile



var request = require("request");
var fs = require('fs');

const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap, take } = require('rxjs/operators');
const { interval } = require('rxjs/observable/interval');

var key = require('./key.json')

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

var type = 'restaurant'
var query = 'hamburger'
var lats = [];

for(let i = 0;i<300;i++){
    var lat = getRandomInRange(41.35, 41.42, 5);
    var lng = getRandomInRange(2.13, 2.22, 5);
    
    
    lats.push({lat: lat, lng:lng})
    
    lats;

}

console.log(lats)
console.log(lats.length)

var places = [];
    // places.push(results);
    var placeids = [];
var intervalo = interval(5000)
intervalo.pipe(take(lats.length)).subscribe(res=>{

// for (let i = 0;i<lats.length;i++){


    var options = { method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    qs: 
     { location: lats[res]['lat']+','+lats[res]['lng'],
       radius: '1000',
       key: key,
       type: type,
        query: query },
    headers: 
     { 'postman-token': '9064423d-4872-cb71-11f9-012d0140dca2',
       'cache-control': 'no-cache' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    var body = JSON.parse(body);
    var results = body.results;
    console.log(results);
 

    if(results[0]!==undefined){
        fs.writeFile("places/bcn/"+query+res+".json", JSON.stringify(results), function(err) {
            if(err) {
                return console.log(err);
            }
    
            console.log("The file was saved!");
        }); 
    }
    
  
  });


  
})