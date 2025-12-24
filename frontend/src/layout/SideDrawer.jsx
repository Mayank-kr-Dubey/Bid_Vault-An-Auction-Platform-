import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 text-3xl p-2 rounded-md lg:hidden btn btn-primary h-auto px-3 py-2"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-[100%] sm:w-[300px] bg-card h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r border-border`}
      >
        <div className="relative">
          <Link to={"/"}>
            <h4 className="text-2xl font-semibold mb-4 text-foreground">
              Bid<span className="text-primary">Vault</span>
            </h4>
          </Link>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to={"/auctions"}
                className="nav-link text-lg"
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/leaderboard"}
                className="nav-link text-lg"
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="nav-link text-lg"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="nav-link text-lg"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="nav-link text-lg"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="nav-link text-lg"
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}
          </ul>
          {!isAuthenticated ? (
            <>
              <div className="my-4 flex gap-2">
                <Link to={"/sign-up"} className="btn btn-primary text-base">
                  Sign Up
                </Link>
                <Link to={"/login"} className="btn btn-outline text-base">
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
                <button className="btn btn-primary text-base">
                  Logout
                </button>
              </div>
            </>
          )}
          <hr className="mb-4 border-t border-border" />
          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className="nav-link text-lg"
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/how-it-works-info"}
                className="nav-link text-lg"
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="nav-link text-lg"
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden"
          />
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <Link to="https://www.facebook.com/share/1D2FFH5NhX/" className="card p-2 text-xl rounded-md text-muted-foreground hover:text-primary">
              <FaFacebook />
            </Link>
            <Link to="https://www.instagram.com/mayank_dubeyyy/" className="card p-2 text-xl rounded-md text-muted-foreground hover:text-primary">
              <RiInstagramFill />
            </Link>
          </div>
          <Link to={"/contact"} className="link font-medium text-muted-foreground">
            Contact Us
          </Link>
          <p className="text-muted-foreground">&copy; BidVault, LLC.</p>
          <p className="text-muted-foreground">
            Introduced By{" "}
            <Link to={"/"} className="link font-semibold">
                Mayank Kr. Dubey
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
