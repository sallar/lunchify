/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/22/15.
 */
(function() {
    "use strict";
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    /* schema */
    var MealSchema = new Schema({
        name: String,
        name_alt: String
    });

    /* export */
    module.exports = mongoose.model('Meal', MealSchema);
})();