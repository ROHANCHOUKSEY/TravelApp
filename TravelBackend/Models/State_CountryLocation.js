const mongoose = require("mongoose");

const stateCountryLocation = mongoose.Schema({
    madhyaPradesh: [{type: string}],
    maharashtra: [{type: string}],
    rajasthan: [{type: string}],
    tamilNadu: [{type: string}],
    telangana: [{type: string}],
    uttarakhand: [{type: string}],
    himachalPradesh: [{type: string}],
});

module.exports = mongoose.model("state_country", stateCountryLocation);