const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // OpenAI-compatible Grok API
});

const chatWithGrok = async (req, res) => {
  const { message, conversationId } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    // Headers for SSE streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let botText = "";

    // Stream response
    const stream = await client.responses.stream({
      model: "openai/gpt-oss-20b",
      input: message,
      conversation: conversationId || null,
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        botText += event.delta;
        res.write(
          `data: ${JSON.stringify({ type: "token", token: event.delta })}\n\n`,
        );
      }

      if (event.type === "response.error") {
        res.write(
          `data: ${JSON.stringify({ type: "error", error: event.error })}\n\n`,
        );
        res.end();
      }

      if (event.type === "response.completed") {
        res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
        res.end();
      }
    }
  } catch (err) {
    res.write(
      `data: ${JSON.stringify({ type: "error", error: err.message })}\n\n`,
    );
    res.end();
  }
};

module.exports = { chatWithGrok };
