const express = require('express');
const { getModuleController, getModuleTreeController, addModuleController, editModuleController, deleteModuleController } = require('../controllers/module');
const router = express.Router();

router.get("/", getModuleController);
router.get("/tree", getModuleTreeController);
router.post("/add", addModuleController);
router.put("/update/:moduleId", editModuleController);
router.delete("/delete/:moduleId", deleteModuleController);
module.exports = router;
