const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require("mongoose-delete");
const AccountAdminSchema = new Schema(
  {
    id: ObjectId,
    username: String,
    password: String,
    email:String
  },
  {
    timestamps: true,
  }
);
const DiscoverModel = mongoose.model("admin", AccountAdminSchema);

AccountAdminSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: "all",
});

module.exports = DiscoverModel;
