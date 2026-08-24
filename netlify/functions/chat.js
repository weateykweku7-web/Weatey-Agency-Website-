import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req) => {
  try {
    const { message } = JSON.parse(req.body || "{}");

    const response = await client.responses.create({
      model: "gpt-5.5-mini",
      input: [
        {
          role: "system",
          content:
            "You are the AI assistant for Weatey AI Agency. Be professional, friendly, and help visitors learn about AI chatbots, customer support, lead generation, digital services, pricing, and booking consultations."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reply: response.output_text
      })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }
};
