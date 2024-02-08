const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema(
  {
    id: ObjectId,
    username: String,
    email: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ },
    playList: {type:Array,default:Array},
    liked: {type:Array,default:Array},
  },
  {
    timestamps: true,
  }
);
const ModelAccount =mongoose.model('Account',Account);
module.exports =   ModelAccount
