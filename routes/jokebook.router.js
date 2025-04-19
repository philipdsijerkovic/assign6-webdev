"use strict";
const express = require("express");
const router = express.Router();

const jokeController = require("../controllers/jokebook.controller");

router.get("/categories", jokeController.getCategories);

router.get("/joke/:category", jokeController.getJokeByCategory);

router.get("/random", jokeController.getRandomJoke);

router.post("/joke/add", jokeController.createNew);

router.get("/all", jokeController.getAll);

module.exports = router;