const aiService = require("../services/ai");

const generateResponse = async (req, res, next) => {
  try {
    const { message, maxTokens } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await aiService.chatWithLLM(message, maxTokens);
    res.json({ response });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateResponse,
};
