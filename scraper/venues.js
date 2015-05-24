var request = require("request");

var venues = [
    {
        "address": "Keilasatama 3, 02150 Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "666",
        "kitchen_type_id": "1",
        "lat": "60.1737251281738",
        "link": "http://www.amica.fi/laituri#Ruokalista",
        "lng": "24.8293876647949",
        "name": "Amica Laituri",
        "rating": "0",
        "simple_name": "amica-laituri"
    },
    {
        "address": "Keilaranta 15, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "2194",
        "lat": "60.17846290000001",
        "link": "http://www.amica.fi/ravintolat/ravintolat-kaupungeittain/espoo/lets-play/",
        "lng": "24.83520539999995",
        "name": "Amica Let's Play",
        "rating": "5",
        "simple_name": "amica-lets-play"
    },
    {
        "address": "Keilaranta 1, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "1183",
        "kitchen_type_id": "1",
        "lat": "60.176399230957",
        "link": "http://www.sodexo.fi/keilaranta1/lounas",
        "lng": "24.8306999206543",
        "name": "be... Keilaranta",
        "rating": "4.4286",
        "simple_name": "be-keilaranta"
    },
    {
        "address": "Ainoa, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "2183",
        "lat": "60.17599955855904",
        "link": "http://funkyburger.net/",
        "lng": "24.80481503862302",
        "name": "Funky Burger",
        "simple_name": "funky-burger"
    },
    {
        "address": "Keilaranta 12, 02150 Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "2124",
        "lat": "60.17880030000001",
        "link": "http://www.compass-group.fi/Ravintolat/Espoo/Ravintola-Life-Science-Center/kahvila-delimarche/",
        "lng": "24.83483380000007",
        "name": "Kahvila DeliMarché",
        "simple_name": "kahvila-delimarche"
    },
    {
        "address": "Mäntyviita 2, 02110 Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "1544",
        "lat": "60.1788553",
        "link": "http://www.kilim.fi/",
        "lng": "24.8110832",
        "name": "Kilim",
        "rating": "5",
        "simple_name": "kilim"
    },
    {
        "address": "Keilaranta 16, 02150 Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "1877",
        "lat": "60.1793857",
        "link": "http://www.compass-group.fi/ravintolat/Espoo/Ravintola-Life-Science-Center/Lounaslista/",
        "lng": "24.8347329000001",
        "name": "Life Science Center",
        "rating": "3.6",
        "simple_name": "life-science-center"
    },
    {
        "address": "Keilaranta 9, 02150 Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "2055",
        "lat": "60.17640859999999",
        "link": "http://www.keilaniemi.fi/lounasravintola/ravintola-1951/",
        "lng": "24.835367200000064",
        "name": "Ravintola 1951",
        "rating": "3.5",
        "simple_name": "ravintola-1951"
    },
    {
        "address": "Keilaranta 5, 02150 Espoo",
        "city_url_name": "espoo",
        "config": {
            "disabled": 1,
            "scrape_name": "lfkdjklasf"
        },
        "favorite": false,
        "id": "1966",
        "lat": "60.1768472",
        "link": "http://www.keilaniemi.fi/lounasravintola/ravintola-keilalahden-ranta/",
        "lng": "24.8327116",
        "name": "Ravintola Keilalahden Ranta",
        "rating": "3.6667",
        "simple_name": "ravintola-keilalahden-ranta"
    },
    {
        "address": "Miestentie 4, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "2179",
        "lat": "60.17903820000001",
        "link": "http://www.mau-kas.fi/ravintola.html?listtype=lunch&ci=0&showall=true",
        "lng": "24.828097200000002",
        "name": "Ravintola Maukas",
        "simple_name": "ravintola-maukas"
    },
    {
        "address": "Keilasatama 5, 02150 Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "620",
        "kitchen_type_id": "1",
        "lat": "60.1735000610352",
        "link": "http://www.sodexo.fi/keilasatama5/",
        "lng": "24.8295001983643",
        "name": "Sodexo Keilasatama 5",
        "rating": "4.5",
        "simple_name": "sodexo-keilsatama-5"
    },
    {
        "address": "Miestentie 1, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "961",
        "lat": "60.1790008544922",
        "link": "http://www.keilaniemi.fi/lounasravintola/miestentie-1/",
        "lng": "24.8255004882812",
        "name": "Swing'in Miestentie 1",
        "rating": "0",
        "simple_name": "swingin-miestentie-1"
    },
    {
        "address": "Keilaranta 4, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "1132",
        "lat": "60.1769981384277",
        "link": "http://www.keilaniemi.fi/lounasravintola/soupsalad-bar/",
        "lng": "24.8327007293701",
        "name": "Swing'in Soup&Salad Bar K4",
        "rating": "4.5",
        "simple_name": "swingin-soupsalad-bar-k4"
    },
    {
        "address": "Keilaranta 6, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "1204",
        "kitchen_type_id": "5",
        "lat": "60.1772003173828",
        "link": "http://www.keilaniemi.fi/lounasravintola/think/",
        "lng": "24.8334999084473",
        "name": "Think",
        "rating": "3.5",
        "simple_name": "think"
    },
    {
        "address": "Mäntyviita 6, Espoo",
        "city_url_name": "espoo",
        "favorite": false,
        "id": "2161",
        "lat": "60.1792053",
        "link": "http://tonyscorner.fi/ala-carte/lounasbuffet/",
        "lng": "24.812784899999997",
        "name": "Tony's Corner",
        "simple_name": "tonys-corner"
    }
];

for(var i = 0; i < venues.length; i++) {
    request({
        method: 'POST',
        uri: 'https://lunchify.firebaseio.com/areas/keilaniemi/venues.json',
        body: venues[i],
        json: true
    }, function(err, resp, body) {
        console.log('Done');
    });
}