import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="relative w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
          <section className="relative z-10 my-8 flex flex-col items-start">
            <h1 className="text-primary text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4">
              Live & Upcoming Auctions
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              Explore exclusive items, place your bids, and experience the thrill of real-time auctions.
              Every item tells a story — will you be the one to own it?
            </p>

            {/* Card Grid */}
            <div className="grid gap-8 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allAuctions.map((element) => (
                <div
                  key={element._id}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <Card
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    startingBid={element.startingBid}
                    id={element._id}
                  />
                </div>
              ))}
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;
