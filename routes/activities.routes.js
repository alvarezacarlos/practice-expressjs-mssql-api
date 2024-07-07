const express = require("express");

const { activitiesController } = require("../controllers");

const router = express.Router();

router.get('/activities/:id', activitiesController.getOneActivity)
router.get('/activities', activitiesController.getAllActivities)
router.post("/activities/", activitiesController.createOneActivity);
router.put("/activities/:id", activitiesController.updateOneActivity);

module.exports = router;
