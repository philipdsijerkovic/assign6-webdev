"use strict";
const { get } = require("http");
const db = require("./db-conn");

function getAll() {
  let sql = "SELECT * FROM jokes;";
  const data = db.all(sql);
  return data;
}

function createNew(params) {
    db.run("INSERT OR IGNORE INTO joke_categories (name) VALUES (?);", params[0]);
    const catRow = db.get("SELECT id FROM joke_categories WHERE name = ?;", params[0]); 
    let sql = "INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?);"; 
    const info = db.run(sql, catRow.id, params[1], params[2]); // 
    return info;
  }

function getColumnNames() {
  let sql = "select name from pragma_table_info('jokes');";
  const columns = db.all(sql);
  let result = columns.map(a => a.name);
  return result;
}

function getRandomJoke() {
    const sql = "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1;";
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