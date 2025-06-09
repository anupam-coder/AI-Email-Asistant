import axios from "axios";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const generateEmail = async (prompt, tone = "Professional") => {
  const body = {
    model: "mistralai/mistral-7b-instruct",
    messages: [
      {
        role: "user",
        content: `Write a ${tone} email for the following context:\n\n${prompt}`,
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  const res = await axios.post(API_URL, body, { headers });
  return res.data.choices[0].message.content;
};
