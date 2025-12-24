import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = { name, email, phone, subject, message };

    emailjs
      .send("service_v01mtcu", "template_3a1r5xp", templateParams, "YcOimjllS64zn4ghK")
      .then(() => {
        toast.success("✅ Thank you! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("❌ Failed to send message. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <section className="relative w-full ml-0 m-0 px-5 pt-24  flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 card rounded-2xl p-8 sm:p-12 w-full max-w-3xl"
      >
        <h1 className="text-center text-primary text-4xl sm:text-5xl font-extrabold mb-8">
          Get in Touch
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleContactForm}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-muted-foreground text-sm font-medium">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full mt-1"
                required
              />
            </div>

            <div>
              <label className="text-muted-foreground text-sm font-medium">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full mt-1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-muted-foreground text-sm font-medium">Phone Number</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input w-full mt-1"
                required
              />
            </div>

            <div>
              <label className="text-muted-foreground text-sm font-medium">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input w-full mt-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground text-sm font-medium">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input w-full mt-1"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary mx-auto"
            type="submit"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
