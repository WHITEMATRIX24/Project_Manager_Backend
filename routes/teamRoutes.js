const express = require("express");
const { getTeamController, createTeamController, updateTeamController, deleteTeamController } = require("../controllers/team");
const router = express.Router();

router.get("/", getTeamController);
router.post("/create", createTeamController);
router.put("/update/:teamId", updateTeamController);
router.delete("/delete/:teamId", deleteTeamController);
module.exports = router;