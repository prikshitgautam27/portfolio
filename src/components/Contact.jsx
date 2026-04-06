import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_77tpu5b",        // YOUR SERVICE ID
        "template_2vtfs46",       // YOUR TEMPLATE ID
        formData,
        "CTKtIbWNKL7aEJ02v"       // YOUR PUBLIC KEY
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <section id="contact" className="py-32 px-6 bg-darkGray">
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
                <p className="text-center text-green-400 mt-4 font-semibold">
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
