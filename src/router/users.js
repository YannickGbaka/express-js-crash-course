const { Router } = require("express");
const controller = require("../controllers/user");

const router = Router();

router.post("/", controller.store);

module.exports = router;
