const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({

    type: String,

    title: String,

    info: String,

    location: Map,

    xp: Number,

    expires_at: Date,

    checkins:{type:Array, default:[]},

    online: {type:Boolean, default:false},

    pics: {type:Array, default:[]},
    
    created_at: {type:Date, default:Date.now()},
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;