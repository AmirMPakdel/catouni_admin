const mongoose = require("mongoose");

const default_xp = 80;
const likes_base = 50;


const StationSchema = new mongoose.Schema({

    title: String,

    short_info: String,

    info: String,

    type: String,

    pics: Array,

    location: Object,

    xp: {type:Number, default:default_xp},

    is_new: {type:Boolean, default:true},

    is_special: {type:Boolean, default:false},

    checkins:{type:Array, default:[]},

    nof_likes: {type:Number, default:likes_base},

    updated_at: {type:Date, default:Date.now()},
    
    created_at: {type:Date, default:Date.now()},

});

const Station = mongoose.model("Station", StationSchema);

module.exports = Station;