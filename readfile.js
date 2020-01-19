var fs = require( 'fs' );
var path = require( 'path' );
var request = require("request");

//after this go to getinfos

const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap, take } = require('rxjs/operators');
const { interval } = require('rxjs/observable/interval');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require( "process" );

var nameOfFile = 'hamburger'
var dir = "./places/bcn";

fs.readdir( dir, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        } 

        files.forEach( function( file, index ) {
                // Make one pass and make the file complete
                
                console.log(file);
                var pids = require('./'+dir+'/'+file);

                console.log(pids.length);
                var place_details = require('./infos/bcn'+nameOfFile+'.json');

var intervalo = interval(5000);

var key = require('./key.json')

intervalo.pipe(take(pids.length)).subscribe(tempo=>{


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
          if(body2.result!==undefined){
            
          var name = body2.result['name']
          // console.log(name);
          var endereco = body2.result['vicinity']
          var phone = body2.result['international_phone_number']
          var site = body2.result['website']
        // console.log(site);
          place_details.push({name: name, phone: phone, site: site, endereco: endereco})
        //   console.log(place_details);
    // console.log(body);
    fs.writeFile("./infos/bcn"+nameOfFile+".json", JSON.stringify(place_details), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
          }
  });

})
  


        } );
} );