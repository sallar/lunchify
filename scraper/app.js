/**
 * Created by sallar on 5/21/15.
 */
var request = require("request");
var cheerio = require("cheerio");

String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};

request({url: 'https://lunchify.firebaseio.com/areas/keilaniemi/venues.json'}, function(err, resp, body) {
    var json = JSON.parse(body),
        dates = {};

    //json.forEach(function(venue) {
    for(var key in json) {
        if( json.hasOwnProperty(key) ) {
            var venue = json[key];

            var options = {
                url: 'http://lounaat.info/lounas/' + venue.simple_name + '/espoo',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0'
                }
            };

            (function(venue) {
                request(options, function (error, response, body) {
                    var $ = cheerio.load(body);

                    // Items
                    var items = $('#menu .item'),
                        data = {};

                    items.each(function () {
                        var date = $('.item-header h3', this).text();
                        var menuEl = $('.item-body p', this);
                        var menu = [];
                        var meals = [];

                        menuEl.each(function () {
                            menu.push($(this).html());
                        });

                        for (var i = 0; i < menu.length; i += 2) {
                            meals.push({
                                name_fi: menu[i],
                                name: menu[i + 1]
                            });
                        }

                        if (date.match(/(\d+)/)) {
                            date = date.match(/(\d+)/g);
                        }

                        if (typeof date == 'object') {
                            var dateStr = '2015' + '-' + date[1].lpad("0", 2) + '-' + date[0].lpad("0", 2);
                            data[dateStr] = meals;

                            var mealUrl = 'https://lunchify.firebaseio.com/areas/keilaniemi/meals_by_date/' + dateStr + '/' +venue.id+'.json';
                            request({
                                method: 'PUT',
                                uri: mealUrl,
                                body: {
                                  "meals": meals,
                                  "venue": venue
                                },
                                json: true
                            }, function(err, resp, body) {
                                console.log('done updating ' + mealUrl);
                            });
                        }

                    });

                    var api = 'https://lunchify.firebaseio.com/areas/keilaniemi/meals/' + venue.id + '.json';

                    request({
                        method: 'PUT',
                        uri: api,
                        body: data,
                        json: true
                    }, function (err, resp, body) {
                        console.log('done');
                    });

                });
            })(venue);

            //});
        }
    }
});
