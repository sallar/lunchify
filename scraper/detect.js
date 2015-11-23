/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 7/18/15.
 */
"use strict";

//var exec = require('child_process').exec;
var cld = require('cld'),
    PromiseArrays = require('promise-arrays');

/**
 * Detect meals language
 * @param arr
 * @returns {Promise}
 */
/*module.exports = */function oldFunc(obj) {
    return new Promise(function(resolve) {
        Object.keys(obj).forEach(function(key) {
            var menu  = obj[key],
                meals = [],
                last  = false;

            // Detection
            for (var i = 0; i < obj[key].length; i += 1) {
                var test = /English/.test(shell.exec('polyglot cat <<< $"'+menu[i]+'"', {silent: true}).output);

                if(!last) {
                    last = {
                        e: test,
                        n: menu[i]
                    };
                } else {
                    // Last one was Finnish
                    // this one is English, group them.
                    if(!last.e && test) {
                        meals.push({name_fi: last.n, name: menu[i]});
                    }
                    // Reverse
                    else if(last.e && !test) {
                        meals.push({name_fi: menu[i], name: last.n});
                    }
                    // Both are Finnish
                    else if(!last.e && !test) {
                        meals.push({name_fi: last.n, name: null});
                        meals.push({name_fi: menu[i], name: null});
                    }
                    // Both are English
                    else {
                        meals.push({name: last.n, name_fi: null});
                        meals.push({name: menu[i], name_fi: null});
                    }
                    last = false;
                }
            }

            // Excess?
            if(last) {
                meals.push({
                    name: last.e ? last.n : null,
                    name_fi: last.e ? null : last.n
                });
            }

            // Set new menu
            obj[key] = meals;
        });

        (resolve)(obj);
    });
}

module.exports = function(obj) {
    return PromiseArrays.map(Object.keys(obj), function(key) {
        return PromiseArrays.map(obj[key], function(str) {
            return new Promise(function(resolve) {
                var options = {
                    isHTML       : false,
                    httpHint     : 'en',
                    languageHint : 'ENGLISH'
                };

                cld.detect(str, options, function(err, result) {
                    var english = false;
                    if(
                        !err &&
                        result.languages[0].code === 'en' &&
                        result.reliable === true
                    ) {
                        english = true;
                    }

                    resolve({
                        english: english,
                        name: str
                    });
                });
            });
        }).then(function(deteced) {
            obj[key] = deteced;
        });
    }).then(function() {
        return obj;
    });
};