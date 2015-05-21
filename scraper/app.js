/**
 * Created by sallar on 5/21/15.
 */
var path = [],
    routes = [
        "http://lounaat.info/lounas/ravintola-keilalahden-ranta/espoo",
        "http://lounaat.info/lounas/swingin-soupsalad-bar-k4/espoo",
        "http://lounaat.info/lounas/think/espoo",
        "http://lounaat.info/lounas/be-keilaranta/espoo",
        "http://lounaat.info/lounas/ravintola-1951/espoo",
        "http://lounaat.info/lounas/life-science-center/espoo"
    ];

var request = require("request");
var cheerio = require("cheerio");

routes.forEach(function(route) {
    var options = {
        url: route,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'
        }
    };

    request(options, function(error, response, body) {

        var $ = cheerio.load(body);


        // Items
        var items = $('.item', $('.item-container')[0]),
            data  = [];

        items.each(function() {
            var date = $('.item-header h3', this).text();
            var menuEl = $('.item-body li p', this);
            var menu = [];
            var meals = [];

            menuEl.each(function() {
                menu.push($(this).html());
            });

            for(var i = 0; i < menu.length; i += 2) {
                meals.push({
                    name: menu[i],
                    name_fi: menu[i+1]
                });
            }

            if( date.match(/(\d+)/) ) {
                date = date.match(/(\d+)/g);
            }
            //console.log(date);
            if( typeof date == 'object' ) {
                data.push({
                    month: date[1] || null,
                    day: date[0] || null,
                    meals: meals
                });
            }
        });

        console.log(route, data);

    });
});