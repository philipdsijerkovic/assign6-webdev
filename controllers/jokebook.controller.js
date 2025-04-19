"use strict";
const model = require("../models/jokebook.model");

function getAll(req, res, next) {
  try {
    const jokes = model.getAll();
    res.render("jokes", { title: "All Jokes", jokesList: jokes }); 
  } catch (err) {
    console.error("Error while getting jokes: ", err.message);
    next(err);
  }
}

function createNew(req, res, next) {
  let category = req.body.category_id;
  let setup = req.body.setup;
  let delivery = req.body.delivery;

  if (category && setup && delivery) {
    let params = [category, setup, delivery];
    try {
      model.createNew(params);
      res.render("jokes", { gamesList: model.getAll(), title: "All Jokes" });
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
    let joke = model.getRandomJoke();
    res.render("joke-details", { title: "Random Joke", joke: joke });
  } catch (err) {
    console.error("Error while getting random joke: ", err.message);
    next(err);
  }
}

function getCategories(req, res, next) {
  try {
    const categories = model.getColumnNames();
    res.render("categories", { title: "Categories", categories: categories });
  } catch (err) {
    console.error("Error while getting categories: ", err.message);
    next(err);
  }
}

function getJokeByCategory(req, res, next) {
  const category = req.params.category;

  try {
    const jokes = model.getJokesByCategory(category);
    res.render("jokes", { title: `Jokes in ${category}`, jokesList: jokes }); 
  } catch (err) {
    console.error("Error while getting jokes by category: ", err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  createNew,
  getRandomJoke,
  getCategories,
  getJokeByCategory,
};