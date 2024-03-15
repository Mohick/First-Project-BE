// Import necessary modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require("mongoose-delete");

// Define the schema for the Discover model
const DiscoverSchema = new Schema(
  {
    id: ObjectId, // Unique ID of the Discover item
    imageMusical: String, // URL or path to the image of the musical item
    audioMusical: String, // URL or path to the audio file of the musical item
    titleMusical: String, // Title of the musical item
    nameSinger: String, // Name of the singer of the musical item
    country: String, // Country associated with the musical item
    like: { type: Number, default: 0 }, // Number of likes for the musical item, default is 0
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Apply the mongoose-delete plugin for soft delete functionality
DiscoverSchema.plugin(mongoose_delete, {
  deletedBy: true, // Store information about the user who performed the delete
  overrideMethods: "all", // Override all methods related to deletion
});

// Create a model from the schema
const DiscoverModel = mongoose.model("Discover", DiscoverSchema);

module.exports = DiscoverModel; // Export the model for use in other parts of the application
