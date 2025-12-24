import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) navigateTo("/");
    if (id) dispatch(getAuctionDetail(id));
  }, [isAuthenticated]);

  return (
    <section className="min-h-screen px-6 py-20 lg:pl-[300px] bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="text-sm flex flex-wrap gap-2 items-center mb-8 text-muted-foreground">
        <Link to="/" className="link font-medium">
          Home
        </Link>
        <FaGreaterThan />
        <Link to="/auctions" className="link font-medium">
          Auctions
        </Link>
        <FaGreaterThan />
        <p className="text-muted-foreground">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side - Item Details */}
          <motion.div
            className="flex-1 card rounded-lg p-6"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="card rounded-lg overflow-hidden flex justify-center items-center w-full lg:w-40 lg:h-40">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {auctionDetail.title}
                </h2>
                <p className="text-lg font-semibold text-foreground">
                  Condition:{" "}
                  <span className="text-primary">{auctionDetail.condition}</span>
                </p>
                <p className="text-lg font-semibold text-foreground">
                  Minimum Bid:{" "}
                  <span className="text-primary">₹{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-primary">
              Description
            </h3>
            <hr className="border-border mb-4" />
            <ul className="space-y-2 text-muted-foreground">
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => (
                  <li key={index} className="text-lg leading-relaxed">
                    {element}.
                  </li>
                ))}
            </ul>
          </motion.div>

          {/* Right Side - Bids Section */}
          <motion.div
            className="flex-1 flex flex-col rounded-lg overflow-hidden card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="bg-primary text-primary-foreground py-4 px-6 text-2xl font-semibold tracking-wide">
              Live Bids
            </header>

            <div className="flex-1 px-4 py-4 max-h-[600px] overflow-y-auto bg-background">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div
                      key={index}
                      className="py-3 flex items-center justify-between border-b border-border hover:bg-accent rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-10 h-10 rounded-full border border-border"
                        />
                        <p className="text-lg font-semibold text-foreground">{element.userName}</p>
                      </div>
                      <p className="text-lg font-semibold text-primary">
                        {index + 1}
                        {index === 0
                          ? "st"
                          : index === 1
                          ? "nd"
                          : index === 2
                          ? "rd"
                          : "th"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-6">
                    No bids yet — be the first one!
                  </p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="w-full max-h-[650px]"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="w-full max-h-[650px]"
                />
              )}
            </div>

            {/* Bid Input Section */}
            <div className="bg-primary text-primary-foreground py-4 px-4 flex items-center justify-between gap-4">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex gap-2 items-center flex-col sm:flex-row">
                    <p className="font-semibold">Place your bid</p>
                    <input
                      type="number"
                      className="w-36 rounded-lg p-2 bg-background text-foreground text-lg outline-none border border-border"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-outline bg-background text-foreground hover:bg-accent"
                    onClick={handleBid}
                  >
                    <RiAuctionFill size={22} />
                  </motion.button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="font-semibold text-lg">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="font-semibold text-lg">
                  Auction has ended!
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default AuctionItem;
