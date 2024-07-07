const sql = require("mssql");

const { mssqlConnection, tasksQueries } = require("../database");

const getOneTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pool = await mssqlConnection();
    const task = await pool
      .request()
      .input("id", sql.Int, id)
      .query(tasksQueries.getOneTask);
    // res.json({data: task.recordset[0]})
    res
      .status(200)
      .send({ success: true, data: task.recordset[0], message: null });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const pool = await mssqlConnection();
    const task = await pool.request().query(tasksQueries.getAllTasks);
    // res.json({data: task.recordset})
    res
      .status(200)
      .send({ success: true, data: task.recordset, message: null });
  } catch (error) {
    next(error);
  }
};

const createOneTask = async (req, res, next) => {
  const { ...task } = req.body;
  try {
    const pool = await mssqlConnection();
    const result = await pool
      .request()
      .input("date", sql.Date, task.date)
      .input("subject", sql.VarChar, task.subject)
      .query(tasksQueries.getCalendarScheduleID);

    const { id } = result.recordset[0];

    const newTask = await pool
      .request()
      .input("taskName", sql.Text, task.taskName)
      .input("taskDesc", sql.Text, task.taskDesc)
      .input("taskType", sql.Text, task.taskType)
      .input("taskGrade", sql.Decimal(10, 2), task.taskGrade)
      .input("calendarScheduleID", sql.Int, id)
      .query(tasksQueries.createOneTask);

    // res.json({ task: newTask.recordset[0] });
    res.status(201).send({success: true, data: task.recordset[0], message: null})
  } catch (error) {
    next(error);
  }
};

const updateOneTask = async (req, res, next) => {
  const { id } = req.params;
  const { ...task } = req.body;

  try {
    const pool = await mssqlConnection();
    await pool
      .request()
      .input("taskName", sql.VarChar, task.taskName)
      .input("taskDesc", sql.VarChar, task.taskDesc)
      .input("taskType", sql.VarChar, task.taskType)
      .input("taskGrade", sql.Decimal(10, 2), task.taskGrade)
      .input("taskId", sql.Int, parseInt(id))
      .input("date", sql.Date, task.date)
      .input("subjectName", sql.VarChar, task.subject)
      .query(tasksQueries.updateOneTask);

    const udpatedTask = await pool
      .request()
      .input("id", sql.Int, id)
      .query(tasksQueries.getOneTask);

    // res.json({ data: udpatedTask.recordset[0] });
    res.status(204).send({success: true, data: udpatedTask.recordset[0], message: null})
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOneTask,
  getOneTask,
  updateOneTask,
  getAllTasks,
};
