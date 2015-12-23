/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 7/17/15.
 */
"use strict";

var jsdom = require('jsdom'),
    fetch = require('node-fetch'),
    request = require('request'),
    compile = require('./compile'),
    api     = 'http://lunchify.fi/api';

//noinspection JSUnresolvedFunction
fetch(api + '/venues/')
    .then(function(res) {
        return res.json();
    })
    .then(function(venues) {
        // Now we have the venues,
        // Proceed with opening their websites.
        var promises = [];

        // For each venue, create a promise
        venues.forEach(function(venue) {
            var promise = new Promise(function(resolve) {

                // Open the page
                console.log('Opening ' + venue.name);

                jsdom.env(
                    'http://lounaat.info/lounas/' + venue.simple_name + '/espoo',
                    ["http://code.jquery.com/jquery-2.1.4.min.js"],
                    {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0'
                        }
                    },
                    function(errors, window) {
                        // Compile
                        console.log('Compiling Menu for ' + venue.name);
                        compile(venue, window).then(function(menu) {
                            // Iterate
                            var pr = [];

                            Object.keys(menu).forEach(function(date) {
                                pr.push(
                                    (function(venue, date, meals) {
                                        return new Promise(function(r) {
                                            console.log('Saving Menu '+date+' for ' + venue.name);

                                            request({
                                                method: 'POST',
                                                uri: api + '/venues/' + venue._id + '/' + date
                                            }, function(err, resp, body) {
                                                body = JSON.parse(body);

                                                if(meals.length) {
                                                    request({
                                                        method: 'POST',
                                                        uri   : api + '/menus/' + body._id,
                                                        body  : meals,
                                                        json  : true
                                                    }, function () {
                                                        r();
                                                    });
                                                } else {
                                                    r();
                                                }
                                            });
                                        });
                                    })(venue, date, menu[date])
                                );
                            });

                            Promise.all(pr).then(resolve);
                        });
                    }
                );
            });

            // Push to promises
            promises.push(promise);
        });

        // Wait for all promises to complete.
        Promise.all(promises, function() {
            console.log('all promises are done');
        });
    });