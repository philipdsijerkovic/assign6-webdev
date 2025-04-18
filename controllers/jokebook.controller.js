"use strict";
const model = require("../models/jokebook.model");

function getAll(req, res, next) {
  try {
    res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting games ", err.message);
    next(err);
  }
}

function createNew(req, res, next) {
  let category = req.body.category;
  let setup = req.body.setup;
  let delivery = req.body.delivery;

  if (category && setup && delivery) {
    let params = [category, setup, delivery];
    try {
      res.json(model.createNew(params));
    } catch (err) {
      console.error("Error while creating game: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

function getRandomJoke(req, res, next) {
  try {
    res.json(model.getRandomJoke());
  } catch (err) {
    console.error("Error while getting random joke: ", err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  createNew,
  getRandomJoke
};