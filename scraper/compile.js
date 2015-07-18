/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 7/17/15.
 */
"use strict";

var detect = require('./detect');

/**
 * String Helper
 * @param padString
 * @param length
 * @returns {String}
 */
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};

/**
 * UCWords
 * @returns {String}
 */
String.prototype.ucwords = function() {
    var str = this;
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    return str;
};

/**
 * Compile the venue
 * @param venue
 * @param window
 * @returns {Promise}
 */
module.exports = function(venue, window) {
    return new Promise(function(resolve) {
        // Add jQuery
        // And Find Menu Items
        var $ = window.$,
            $items = $("#menu .item"),
            menus = {};

        // Go through each item
        // and save the texts
        $items.each(function() {
            var $date   = $('.item-header h3', this).text(),
                $dishes = $('.item-body p.dish', this),
                meals   = [],
                date;

            if(/(\d+)/.test($date)) {
                // Find the Date
                date = $date.match(/(\d+)/g);
                date = '2015' + '-' + date[1].lpad("0", 2) + '-' + date[0].lpad("0", 2);

                // Now process meals
                $dishes.each(function() {
                    var txt = $(this).text().replace(/((^|\s|,)[a-z]{1,3}($|\s|,))/g, ', ');
                    txt = (txt.split(/[\s,]{2,}/)).filter(Boolean).join(', ');
                    if(!/:$/.test(txt)) {
                        meals.push(txt.ucwords());
                    }
                });

                // Push to menus
                menus[date] = meals;
            }
        });

        // Now detect languages
        // Using command line
        detect(menus).then(function(newMenus) {
            (resolve)(newMenus);
        });
    });
};