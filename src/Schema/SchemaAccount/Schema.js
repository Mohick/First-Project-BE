const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require("mongoose-delete");
const AccountSchema = new Schema(
  {
    id: ObjectId,
    username: String,
    email: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: String,
    playList: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
AccountSchema.plugin(mongoose_delete, { overrideMethods: true });
const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = AccountModel;
