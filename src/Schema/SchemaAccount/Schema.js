// Import necessary modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require("mongoose-delete");

// Define the schema for user accounts
const AccountSchema = new Schema(
  {
    id: ObjectId, // Unique ID of the account
    username: String, // Username of the user
    email: {
      type: String, // Data type for email
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
    },
    password: String, // Password of the account
    playList: {
      type: Array, // Data type is an array
      default: [], // Default value is an empty array
    },
    liked: {
      type: Array, // Data type is an array
      default: [], // Default value is an empty array
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Use the mongoose_delete plugin for soft delete functionality
AccountSchema.plugin(mongoose_delete, {
  deletedBy: true, // Store information about the user who performed the delete
  overrideMethods: "all", // Override all methods related to deletion
});

// Create a model from the schema
const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = AccountModel; // Export the model for use in other parts of the application
