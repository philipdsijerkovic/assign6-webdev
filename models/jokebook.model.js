"use strict";
const { get } = require("http");
const db = require("./jokebook.db-conn");

function getAll() {
  let sql = "SELECT * FROM jokes;";
  const data = db.all(sql);
  return data;
}

function createNew(params) {
  let sql = "INSERT INTO jokes " +
    "(category_id, setup, delivery) " +
    "VALUES(?, ?, ?); ";
  const info = db.run(sql, params);
  return info;
}

function getColumnNames() {
  const sql = "SELECT name FROM joke_categories;";
  const categories = db.all(sql);
  return categories.map(category => category.name);
}

function getRandomJoke() {
  const sql = `
    SELECT jokes.id, joke_categories.name AS category, jokes.setup, jokes.delivery, jokes.created_at
    FROM jokes
    JOIN joke_categories ON jokes.category_id = joke_categories.id
    ORDER BY RANDOM() LIMIT 1;
  `;
  const joke = db.get(sql);
  return joke;
}

function getJokesByCategory(category) {
    const sql = `
      SELECT jokes.*
      FROM jokes
      JOIN joke_categories ON jokes.category_id = joke_categories.id
      WHERE joke_categories.name = ?;
    `;
    const jokes = db.all(sql, category);
    return jokes;
  }

module.exports = {
  getAll,
  createNew,
  getRandomJoke,
  getColumnNames,
  getJokesByCategory
};