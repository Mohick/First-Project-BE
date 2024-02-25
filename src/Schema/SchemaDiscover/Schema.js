const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require("mongoose-delete");
const DiscoverSchema = new Schema(
  {
    id: ObjectId,
    imageMusical: String,
    audioMusical: String,
    titleMusical: String,
    nameSinger: String,
    country: String,
    like: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

DiscoverSchema.plugin(mongoose_delete, {
  deletedBy: true,
  overrideMethods: "all",
});
const DiscoverModel = mongoose.model("Discover", DiscoverSchema);

module.exports = DiscoverModel;
