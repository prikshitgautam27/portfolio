import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

// Words/phrases that mark a message as trolling/spam rather than a genuine inquiry.
// Add more over time as you see patterns — this is a first line of defense, not a perfect filter.
const BLOCKED_TERMS = [
  "bullshit", "idiot", "stupid", "loser", "scam",
  "viagra", "crypto investment", "seo services", "backlink",
  "casino", "forex", "click here", "make money fast",
];

const MIN_MESSAGE_LENGTH = 10;
const MIN_TIME_ON_FORM_MS = 3000; // real people take at least a few seconds to type
const RATE_LIMIT_MS = 60000;      // one submission per minute per browser

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot — real users never see or fill this field
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"
  const formLoadTime = useRef(Date.now());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const looksLikeSpam = (data) => {
    // 1. Honeypot — bots fill every field, real users never see this one
    if (data.company.trim() !== "") return "honeypot";

    // 2. Time trap — bots submit near-instantly
    if (Date.now() - formLoadTime.current < MIN_TIME_ON_FORM_MS) return "too-fast";

    // 3. Rate limit — block rapid repeat submissions from the same browser
    const lastSubmit = Number(localStorage.getItem("lastContactSubmit") || 0);
    if (Date.now() - lastSubmit < RATE_LIMIT_MS) return "rate-limited";

    // 4. Minimum effort — block one-word / junk messages
    if (data.message.trim().length < MIN_MESSAGE_LENGTH) return "too-short";

    // 5. Keyword filter — block obvious trolling/spam content
    const lowerMsg = (data.name + " " + data.message).toLowerCase();
    if (BLOCKED_TERMS.some((term) => lowerMsg.includes(term))) return "blocked-terms";

    // 6. Link-blast filter — genuine inquiries rarely contain multiple links
    const linkCount = (data.message.match(/https?:\/\/|www\./gi) || []).length;
    if (linkCount > 1) return "too-many-links";

    return null;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const spamReason = looksLikeSpam(formData);
    if (spamReason) {
      // Bots get a fake "success" so they don't learn to route around the filter;
      // real users get an honest, specific message so they can actually fix it.
      if (spamReason === "honeypot" || spamReason === "too-fast") {
        setStatusType("success");
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "", company: "" });
        return;
      }
      const messages = {
        "rate-limited":   "You've already sent a message recently — please wait a minute before sending another.",
        "too-short":      "Please write a bit more detail so I know what you're reaching out about.",
        "blocked-terms":  "Please keep your message respectful and try again.",
        "too-many-links": "Please remove extra links from your message and try again.",
      };
      setStatusType("error");
      setStatus(messages[spamReason]);
      return;
    }

    emailjs
      .send(
        "service_77tpu5b",        // YOUR SERVICE ID
        "template_2vtfs46",       // YOUR TEMPLATE ID
        { name: formData.name, email: formData.email, message: formData.message },
        "CTKtIbWNKL7aEJ02v"       // YOUR PUBLIC KEY
      )
      .then(
        () => {
          localStorage.setItem("lastContactSubmit", String(Date.now()));
          setStatusType("success");
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "", company: "" });
        },
        () => {
          setStatusType("error");
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <section id="contact" className="py-20 px-6 bg-darkGray">
      <div className="max-w-6xl mx-auto">
        
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-blue-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT SIDE — CONTACT INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-400 text-2xl" />
              <div>
                <p className="text-gray-400">Email</p>
                <a
                  href="mailto:pgautamlinkedin@gmail.com"
                  className="text-white hover:text-blue-400 transition"
                >
                  pgautamlinkedin@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaPhone className="text-blue-400 text-2xl" />
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="text-white">(+91) 9877035742</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaLinkedin className="text-blue-400 text-2xl" />
              <div>
                <p className="text-gray-400">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/prikshit-gautam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition"
                >
                  Prikshit Gautam
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaGithub className="text-blue-400 text-2xl" />
              <div>
                <p className="text-gray-400">GitHub</p>
                <a
                  href="https://github.com/prikshitgautam27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition"
                >
                  prikshitgautam27
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — CONTACT FORM */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-lg"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={sendEmail}
              className="bg-dark p-8 rounded-lg space-y-4"
            >
              {/* Honeypot field — hidden from real users, bots fill it anyway */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                }}
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-darkGray rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-darkGray rounded-lg text-white placeholder-gray-500 focus:outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-darkGray rounded-lg text-white placeholder-gray-500 focus:outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition"
              >
                Send Message
              </button>

              {status && (
                <p className={`text-center mt-4 font-semibold ${statusType === "error" ? "text-red-400" : "text-green-400"}`}>
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
