import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen px-5 pt-24 lg:pl-[320px] bg-background flex flex-col text-foreground">
      {/* Hero Section */}
      <div className="flex flex-col justify-center text-center md:text-left mb-16">
        <p className="text-muted-foreground font-semibold text-lg tracking-wide">
          Transparency Leads to Victory
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mt-4">
          Transparent <span className="text-primary">Auctions</span>
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold mt-2">
          Be the <span className="text-primary">Winner</span>
        </h2>

        {/* Buttons */}
        {!isAuthenticated && (
          <div className="flex gap-6 mt-10 justify-center md:justify-start">
            <Link to="/sign-up" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center md:text-left mb-8 text-primary">
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className="card rounded-lg p-5 transition-all duration-300 hover:shadow-lg"
            >
              <h5 className="text-xl font-semibold text-primary mb-2">
                {item.title}
              </h5>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auctions Sections */}
      <div className="space-y-16">
        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </div>
    </section>
  );
};

export default Home;
