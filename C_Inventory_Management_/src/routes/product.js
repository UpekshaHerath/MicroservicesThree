const express = require('express');
const router = express.Router();
const noteController = require('../Controller/productController');

router.post("/", noteController.createNote)

router.get("/", noteController.getAllNotes)

router.get("/:id", noteController.getOneNote) // pass the id as a parameter

router.put("/:id", noteController.updateOneNote);

router.delete("/:id", noteController.deleteOneNote)

module.exports = router;
