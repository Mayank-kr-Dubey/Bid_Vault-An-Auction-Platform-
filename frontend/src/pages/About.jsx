import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  return (
<section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 lg:pl-[300px] bg-background text-foreground">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">
          About <span className="text-foreground">BidVault</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-primary">BidVault</span>, the ultimate destination for online auctions and bidding excitement.
          Founded in 2024, our mission is to make buying and selling effortless, engaging, and secure.
        </p>
      </motion.div>

      {/* Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="card rounded-2xl p-8 md:p-12 w-full max-w-5xl"
      >
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3 className="text-3xl font-semibold text-primary mb-3">
            Our Mission
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            At BidVault, our mission is to revolutionize the way people buy and sell items online. 
            We're building an engaging and trustworthy marketplace that empowers individuals and 
            businesses to discover unique products and enjoy the thrill of competitive bidding.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3 className="text-3xl font-semibold text-primary mb-5">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <motion.div
                key={v.id}
                whileHover={{ scale: 1.02 }}
                className="card p-5 rounded-lg"
              >
                <h4 className="text-2xl font-bold text-foreground mb-2">
                  {v.title}
                </h4>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3 className="text-3xl font-semibold text-primary mb-3">
            Our Story
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Introduced by <span className="font-semibold text-primary">Mayank Kumar Dubey</span>, BidVault was born out of a 
            passion for connecting people with exceptional and rare items. 
            Our experienced team is committed to building a global auction platform that delivers 
            transparency, innovation, and excitement at every step.
          </p>
        </motion.div>

        {/* Join */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-semibold text-primary mb-3">
            Join Us
          </h3>
          <p className="text-muted-foreground text-lg mb-6">
            Whether you're here to buy, sell, or simply explore — join the BidVault community today. 
            Discover new opportunities, unlock hidden treasures, and experience the thrill of winning!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Join the Revolution 🚀
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer line */}
      <p className="mt-10 text-muted-foreground text-sm text-center">
        © 2025 BidVault. Crafted with ❤️ by <span className="text-primary font-semibold">Mayank Kumar Dubey</span>.
      </p>
    </section>
  );
};

export default About;
