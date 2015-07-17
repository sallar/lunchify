/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 7/18/15.
 */
"use strict";

//var exec = require('child_process').exec;
var shell = require('shelljs');

// executes `pwd`
//child = exec('polyglot cat <<< $"Porsaan kassleria vihreässä currykastikkeessa"', function (error, stdout, stderr) {
//    if(/Finnish/.test(stderr)) {
//        console.log('Finnish Detected');
//    } else {
//        console.log('English Detected');
//    }
//});

/**
 * Detect meals language
 * @param arr
 * @returns {Promise}
 */
module.exports = function(obj) {
    return new Promise(function(resolve) {
        Object.keys(obj).forEach(function(key) {
            var menu  = obj[key],
                meals = [];

            // Detection
            for (var i = 0; i < obj[key].length; i += 2) {
                var couple = [];

                for(var j = 0; j < 2; j++) {
                    couple[j] = /English/.test(shell.exec('polyglot cat <<< $"'+menu[i+j]+'"', {silent: true}).output);
                }

                if(couple[0] && !couple[1]) {
                    meals.push({name_fi: menu[i+1], name: menu[i]});
                } else if(!couple[0] && couple[1]) {
                    meals.push({name_fi: menu[i], name: menu[i+1]});
                } else {
                    meals.push({name_fi: menu[i], name: ''});
                    meals.push({name_fi: menu[i+1], name: ''});
                }
            }

            // Set new menu
            obj[key] = meals;
        });

        (resolve)(obj);
    });
};