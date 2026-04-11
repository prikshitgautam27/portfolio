// api/chat.js  — Vercel Serverless Function
// Place this file at: YOUR_PROJECT_ROOT/api/chat.js

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // CORS headers — allow your Vercel domain
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { messages } = req.body;

    const SYSTEM_PROMPT = `You are an AI assistant embedded in Prikshit Gautam's portfolio website. 
Your job is to answer questions about Prikshit in a friendly, concise, and professional way.
Always speak about Prikshit in third person. Keep answers under 80 words unless the user asks for detail.
If asked something you don't know, say "I'm not sure about that — you can reach Prikshit directly at pgautamlinkedin@gmail.com".

Here is everything you know about Prikshit:

PERSONAL:
- Full name: Prikshit Gautam
- Location: Patiala, Punjab, India
- Email: pgautamlinkedin@gmail.com
- LinkedIn: linkedin.com/in/prikshit-gautam
- GitHub: github.com/prikshitgautam27

EDUCATION:
- B.E. in Electronics and Computer Engineering
- Thapar Institute of Engineering & Technology (TIET), Patiala
- Duration: 2023 - 2027 (currently in 2nd year)

SKILLS:
- Languages: Python, C++, MATLAB, SQL
- ML/AI: PyTorch, TensorFlow, scikit-learn, YOLOv8, LangChain, Hugging Face, FAISS, OpenCV, LSTM/RNN, NLP, RAG, Computer Vision
- Full Stack: React, Node.js, Express, MongoDB, MySQL, Tailwind CSS
- Cloud/Tools: AWS Lambda, AWS S3, AWS EC2, Flask, Streamlit, Docker, Git
- IDEs: Cursor, Claude Code, VSCode

EXPERIENCE:
1. LLM Intern - Edunet Foundation (Jan 2025 - Feb 2025, Remote)
   - Built NLP chatbot with 90%+ intent accuracy
   - Reduced API latency by 25%

2. Summer Project Intern - Experiential Learning Centre, TIET (Jun 2025 - Jul 2025)
   - Built YOLOv8 computer vision system, 89.7% mAP
   - Presented to 10+ faculty, received commendation

PROJECTS:
1. AI Road Intelligence - YOLOv8 + SUMO, 45 FPS, <50ms latency
2. VisionCARE AI - Cataract Detection, Ensemble CNN, Streamlit
3. Healthcare Assistant - LangChain RAG, FAISS, 2050+ medical topics, 40% relevance improvement
4. Cloud File Management - AWS S3, Flask, IAM, EC2, multi-region replication
5. Delay Pattern Prediction in 5G - RNN/LSTM, 95% accuracy, 40K+ traces from KTH dataset

ACHIEVEMENTS:
- Adobe Hackathon: Top 4029 out of 115,000 teams
- Complete Data Science & ML - Udemy (Krish Naik)
- Geometrical Shape Detection - Verified by Thapar-LMS

AVAILABILITY:
- Open to internships, research collaborations, full-time roles
- Actively learning: Agentic AI, LangGraph, Transformers fine-tuning`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method:  "POST",
      headers: {
        "Content-Type":         "application/json",
        "x-api-key":            process.env.ANTHROPIC_API_KEY, // set in Vercel dashboard
        "anthropic-version":    "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-haiku-4-5-20251001", // fast + cheap for chatbot
        max_tokens: 300,
        system:     SYSTEM_PROMPT,
        messages:   messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return res.status(500).json({ error: "API error" });
    }

    const data = await response.json();
    const reply = data?.content?.[0]?.text || "Sorry, I couldn't get a response.";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
