import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
    },
  ];

  return (
    <section className="w-full min-h-screen px-5 lg:pl-[320px] pt-20 pb-10 flex flex-col justify-center bg-background text-foreground">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold mb-3 text-primary">
          How BidVault Works
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Understand each step of the auction process — from registration to
          winning your dream bid.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-6">
        {steps.map((element, index) => (
          <div
            key={index}
            className="card rounded-lg p-5 md:p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3">
              <div className="bg-primary text-primary-foreground p-3 text-2xl rounded-full w-fit">
                {element.icon}
              </div>

              <h3 className="text-2xl font-bold text-primary">
                {element.title}
              </h3>

              <p className="text-muted-foreground text-lg">
                {element.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
