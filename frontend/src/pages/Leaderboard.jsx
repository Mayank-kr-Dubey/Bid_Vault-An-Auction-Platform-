import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen px-5 pt-20 lg:pl-[320px] flex flex-col bg-background text-foreground">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2 mb-5">
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-primary">
              Bidders Leaderboard
            </h1>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg card">
            <table className="min-w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr className="text-left">
                  <th className="py-3 px-4 font-semibold">Profile Pic</th>
                  <th className="py-3 px-4 font-semibold">Username</th>
                  <th className="py-3 px-4 font-semibold">Bid Expenditure</th>
                  <th className="py-3 px-4 font-semibold">Auctions Won</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 100).map((element, index) => (
                  <tr
                    key={element._id}
                    className="border-b border-border hover:bg-accent transition-all duration-300"
                  >
                    <td className="flex gap-3 items-center py-3 px-4">
                      <span className="text-muted-foreground font-bold text-lg w-6 hidden sm:block">
                        {index + 1}
                      </span>
                      <img
                        src={element.profileImage?.url}
                        alt={element.username}
                        className="h-12 w-12 object-cover rounded-full border-2 border-primary/60"
                      />
                    </td>
                    <td className="py-3 px-4 text-lg font-medium">
                      {element.userName}
                    </td>
                    <td className="py-3 px-4 text-primary font-semibold">
                      ${element.moneySpent}
                    </td>
                    <td className="py-3 px-4 text-primary font-semibold">
                      {element.auctionsWon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
