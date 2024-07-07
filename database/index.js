const mssqlConnection = require("./mssqlConnection");
const activityQueries = require("./activitiesQueries");
const tasksQueries = require('./tasksQueries')

module.exports = {
  mssqlConnection,
  activityQueries,
  tasksQueries,
}