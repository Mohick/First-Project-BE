const express = require("express");
const routes = express.Router();
const CRUD = require("../../../../Controll Views/Account/CRUD/Update");

// Route for updating multiple items
routes.patch("/multiple", CRUD.multipleRestore);

// Route for restoring an item
routes.patch("/:id", CRUD.restore);

// Route for updating an item
routes.put("/:id", CRUD.update);

// Route for viewing an item
routes.get("/:id", CRUD.viewUpdate);

module.exports = routes;
