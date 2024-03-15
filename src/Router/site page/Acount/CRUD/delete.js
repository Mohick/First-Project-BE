const express = require("express");
const routes = express.Router();
const CRUD = require("../../../../Controll Views/Account/CRUD/Delete");


// Route for deleting multiple items
routes.delete("/multipledestroy", CRUD.multipleDestroy);

// Route for permanently destroying an item
routes.delete("/destroy", CRUD.destroy);

// Route for deleting a single item
routes.delete("/:id", CRUD.softDelete);

module.exports = routes;
