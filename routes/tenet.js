const { Router } = require("express");
const {
  createTenetController,
  tenetDetailsById,
  deleteTenetById,
} = require("../controllers/tenet");
const router = Router();

router.post("/create-tenet", createTenetController);
router.get("/get-tenetdetails_by_id/:tenetId", tenetDetailsById);
router.delete("/delete_tent_by_id/:tenetId", deleteTenetById);

module.exports = router;
