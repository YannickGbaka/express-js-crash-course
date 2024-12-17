const importDynamic = new Function("modulePath", "return import(modulePath)");

const { client } = importDynamic("@gradio/client");
const chatWithLLM = async (message, maxTokens = 10) => {
  try {
    const client = await Client.connect(
      "huggingface-projects/llama-3.2-vision-11B"
    );
    const result = await client.predict("/chat", {
      message: { text: message, files: [] },
      max_new_tokens: maxTokens,
    });
    return result.data;
  } catch (error) {
    console.error("Error in AI service:", error);
    throw error;
  }
};

module.exports = {
  chatWithLLM,
};
