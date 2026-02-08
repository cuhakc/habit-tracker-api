const router = require("express").Router();
const { getQuote } = require("../controllers/externalController");

router.get("/quote", getQuote);

module.exports = router;