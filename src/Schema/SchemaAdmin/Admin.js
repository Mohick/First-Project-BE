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
  
  AccountAdminSchema.plugin(mongoose_delete, {
    deletedBy: true,
    overrideMethods: "all",
  });
  
  const AdminModel = mongoose.model("admin", AccountAdminSchema);
  module.exports = AdminModel;
