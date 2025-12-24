import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full card mt-5">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th className="w-1/3 py-2">User ID</th>
              <th className="w-1/3 py-2">Status</th>
              <th className="w-1/3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 text-center">{element.userId}</td>
                    <td className="py-2 px-4 text-center">{element.status}</td>
                    <td className="flex items-center py-4 justify-center gap-3">
                      <button className="btn btn-primary text-sm" onClick={() => handleFetchPaymentDetail(element._id)}>
                        Update
                      </button>
                      <button className="btn btn-destructive text-sm" onClick={() => handlePaymentProofDelete(element._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center text-xl text-primary py-3">
                <td>No payment proofs are found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <>
      <section
        className={`fixed ${openDrawer && singlePaymentProof.userId ? "bottom-0" : "-bottom-full"} left-0 w-full transition-all duration-300 h-full bg-black/50 flex items-end`}
      >
        <div className="bg-background border-t border-border h-fit transition-all duration-300 w-full">
          <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
            <h3 className="text-primary  text-3xl font-semibold text-center mb-1">
              Update Payment Proof
            </h3>
            <p className="text-muted-foreground">
              You can update payment status and amount.
            </p>
            <form className="flex flex-col gap-5 my-5">
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-muted-foreground ">User ID</label>
                <input
                  type="text"
                  value={singlePaymentProof.userId || ""}
                  disabled
                  onChange={(e) => e.target.value}
                  className="input text-xl text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-muted-foreground">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input text-xl"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-muted-foreground">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input text-xl"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Settled">Settled</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-muted-foreground">Comment</label>
                <textarea
                  rows={5}
                  value={singlePaymentProof.comment || ""}
                  onChange={(e) => e.target.value}
                  disabled
                  className="input text-xl text-muted-foreground"
                />
              </div>
              <div>
                <Link to={singlePaymentProof.proof?.url || ""} className="btn btn-outline w-full justify-center text-base" target="_blank">
                  Payment Proof (SS)
                </Link>
              </div>
              <div>
                <button type="button" className="btn btn-primary w-full justify-center text-base" onClick={handlePaymentProofUpdate}>
                  {loading ? "Updating Payment Proof" : "Update Payment Proof"}
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
    </>
  );
};
