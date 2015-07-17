/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 7/17/15.
 */
"use strict";

var jsdom = require('jsdom'),
    fetch = require('node-fetch'),
    compile = require('./compile');

//noinspection JSUnresolvedFunction
fetch('http://127.0.0.1:8080/api/venues/')
    .then(function(res) {
        return res.json();
    })
    .then(function(venues) {
        // Now we have the venues,
        // Proceed with opening their websites.
        var promises = [];

        var temp = [venues[2]];

        // For each venue, create a promise
        temp.forEach(function(venue) {
            var promise = new Promise(function(resolve) {

                // Open the page
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
                        compile(venue, window).then(function(menu) {
                            console.log(menu);
                            (resolve)();
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

//jsdom.env(
//    "https://iojs.org/dist/",
//    ["http://code.jquery.com/jquery-2.1.4.min.js"],
//    function (errors, window) {
//        console.log("there have been", window.$("a").length - 4, "io.js releases!");
//    }
//);