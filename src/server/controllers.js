import { config } from 'dotenv';
config();
import path from 'path';
import rp from 'request-promise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/Operator/map';

const PROP_URL = `http://api.zoopla.co.uk/api/v1/property_listings.js`;


export var getProperties = function(req, res) {

	var price = req.query.price || 0;

	var options = {
		uri: PROP_URL,
		qs: {
			api_key: process.env.API_KEY,
			country: 'England',
			maximum_price: price,
			minimum_price: price,
			listing_status: 'sale',
			summarised: 'yes',
			page_size: 50
		},
		headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json: true
	};



	rp(options).then(function(data) {

	Observable
		.of(data.listing)
	    .map((data) => {
	    	return data.map((property) => ({
	    							type: "Feature",
						    		geometry: {
						    			type: "Point",
						    			coordinates: [ property.longitude,
						    			               property.latitude ]
						    		},
						    		price: property.price 
		    			}))
		    })
		    .subscribe((properties) => {
		    	console.log(properties);
		    	return res.json(properties);
		    },
		    (err) => console.log(err));
		
	}).catch(function(err) {
		console.log(err);
	});

	
	
};

export var client = function(req, res) {	
  res.sendFile(path.join(__dirname, '../../dist/client', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
}