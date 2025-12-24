import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="basis-full card rounded-lg group sm:basis-56 lg:basis-60 2xl:basis-80">
        <img
          src={imgSrc}
          alt={title}
          className="w-full aspect-[3/2] m-auto object-cover max-h-48"
        />
        <div className="px-3 pt-4 pb-3">
          <h5 className="font-semibold text-[18px] group-hover:text-primary mb-2 text-foreground">
            {title}
          </h5>
          {startingBid && (
            <p className="text-muted-foreground font-light">
              Starting Bid:{" "}
              <span className="text-primary font-semibold ml-1">
                {startingBid}
              </span>
            </p>
          )}
          <p className="text-muted-foreground font-light">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-primary font-semibold ml-1">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-primary font-semibold ml-1">Time's up!</span>
            )}
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <Link className="btn btn-outline text-base w-full justify-center" to={`/auction/details/${id}`}>
              View Auction
            </Link>
            <button className="btn btn-destructive text-base w-full justify-center" onClick={handleDeleteAuction}>
              Delete Auction
            </button>
            <button disabled={new Date(endTime) > Date.now()} onClick={() => setOpenDrawer(true)} className="btn btn-primary text-base w-full justify-center">
              Republish Auction
            </button>
          </div>
        </div>
      </div>
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const {loading} = useSelector(state => state.auction);
  const handleRepbulishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${openDrawer && id ? "bottom-0" : "-bottom-full"} left-0 w-full transition-all duration-300 h-full bg-black/50 flex items-end`}
    >
      <div className="bg-background border-t border-border h-fit transition-all duration-300 w-full">
        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
          <h3 className="text-primary text-3xl font-semibold text-center mb-1">
            Republish Auction
          </h3>
          <p className="text-muted-foreground">
            Let's republish auction with same details but new starting and
            ending time.
          </p>
          <form className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-muted-foreground">
                Republish Auction Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h,mm aa"}
                className="input"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-muted-foreground">
                Republish Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h,mm aa"}
                className="input"
              />
            </div>
            <div>
              <button type="button" className="btn btn-primary w-full justify-center text-base" onClick={handleRepbulishAuction}>
                {loading ? "Republishing" : "Republish"} 
              </button>
            </div>
            <div>
              <button type="button" className="btn btn-outline w-full justify-center text-base" onClick={() => setOpenDrawer(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
