const axios = require("axios");
const { asyncHandler } = require("../utils/asyncHandler");

const getQuote = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice", {
      timeout: 8000,
      headers: { Accept: "application/json" }
    });

    const slip = response.data && response.data.slip;

    if (!slip || !slip.advice) {
      return res.status(502).json({
        message: "External API returned unexpected response"
      });
    }

    res.json({
      source: "api.adviceslip.com",
      quote: slip.advice,
      author: "Advice Slip"
    });
  } catch (err) {
    res.status(502).json({
      message: "External API request failed",
      hint: "Try again later",
      error: err.message
    });
  }
});

module.exports = { getQuote };