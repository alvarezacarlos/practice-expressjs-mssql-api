const sql = require("mssql");

const { mssqlConnection, activityQueries } = require("../database");

const getOneActivity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pool = await mssqlConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(activityQueries.getOneActivity);
    // res.json({ data: result.recordset[0] });
    res.status(200).send({success: true, data: result.recordset[0], message: null })
  } catch (error) {
    next(error);
  }
};

const getAllActivities = async (req, res, next) => {
  try {
    const pool = await mssqlConnection();
    const result = await pool.request().query(activityQueries.getAllActivities);
    // res.json({ data: result.recordset });
    res.status(200).send({success: true, data: result.recordset, message: null })
  } catch (error) {
    next(error);
  }
};

const createOneActivity = async (req, res, next) => {
  const { ...activitiy } = req.body;
  try {
    const pool = await mssqlConnection();
    const result = await pool
      .request()
      .input("date", sql.Date, activitiy.date)
      .input("subject", sql.VarChar, activitiy.subject)
      .query(activityQueries.getCalendarScheduleID);

    const { id: scheduledId } = result.recordset[0];

    const newActivity = await pool
      .request()
      .input("activityName", sql.Text, activitiy.activityName)
      .input("activityDesc", sql.Text, activitiy.activityDesc)
      .input("activityType", sql.Text, activitiy.activityType)
      .input("activityGrade", sql.Decimal(10, 2), activitiy.activityGrade)
      .input("calendarScheduleId", sql.Int, scheduledId)
      .query(activityQueries.createOneActivity);
    // res.json({ data: newActivity.recordset[0] });
    res.status(201).send({success: true, data: newActivity.recordset[0], message: null })
  } catch (error) {
    next(error);
  }
};

const updateOneActivity = async (req, res, next) => {
  const { id } = req.params;
  const { ...activitiy } = req.body;
  try {
    const pool = await mssqlConnection();
    await pool
      .request()
      .input("activityName", sql.VarChar, activitiy.activityName)
      .input("activityDesc", sql.VarChar, activitiy.activityDesc)
      .input("activityType", sql.VarChar, activitiy.activityType)
      .input("activityGrade", sql.Decimal(10, 2), activitiy.activityGrade)
      .input("activityId", sql.Int, parseInt(id))
      .input("date", sql.Date, activitiy.date)
      .input("subjectName", sql.VarChar, activitiy.subject)
      .query(activityQueries.updateOneActivity);

    const udpatedActivity = await pool
      .request()
      .input("id", sql.Int, id)
      .query(activityQueries.getOneActivity);
    // res.json({ data: udpatedActivity.recordset[0] });
    res.status(204).send({success: true, data: udpatedActivity.recordset[0], message: null })
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOneActivity,
  getOneActivity,
  updateOneActivity,
  getAllActivities,
};