import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);
  return (
    <>
      <section className="my-8 lg:px-5">
        <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2">
          <h3 className="text-foreground text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Top 10
          </h3>
          <h3 className="text-primary text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Bidders Leaderboard
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full card my-5">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Profile Pic</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Bid Expenditure</th>
                <th className="py-2 px-4 text-left">Auctions Won</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              {leaderboard.slice(0, 10).map((element, index) => {
                return (
                  <tr key={element._id} className="border-b border-border">
                    <td className="flex gap-2 items-center py-2 px-4">
                      <span className="text-muted-foreground font-semibold text-xl w-7 hidden sm:block">
                        {index + 1}
                      </span>
                      <span>
                        <img
                          src={element.profileImage?.url}
                          alt={element.username}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </span>
                    </td>
                    <td className="py-2 px-4">{element.userName}</td>
                    <td className="py-2 px-4">{element.moneySpent}</td>
                    <td className="py-2 px-4">{element.auctionsWon}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Link to={"/leaderboard"} className="btn btn-outline w-full justify-center text-base">
          Go to Leaderboard
        </Link>
      </section>
    </>
  );
};

export default Leaderboard;
