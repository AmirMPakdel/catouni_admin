const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    phone_number: String,

    phone_number_dcr: String,

    full_name: {type:String, default:""},

    type: {type:String, default:"regular"},
    
    xp: {type:Number, default:0},
    
    medals: {type:Array, default:[]},

    checkins:{type:Array, default:[]},
    
    pics: {type:Array, default:[]},
    
    bio: {type:String, default:""},
    
    profile_pic: {type:String, default:""},

    verification_code: String,

    verified: {type:Boolean, default:false},
    
    created_at: {type:Date, default:Date.now()},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;