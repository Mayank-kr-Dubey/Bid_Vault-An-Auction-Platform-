import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="min-h-screen flex items-center justify-center lg:pl-[300px] bg-background px-4 py-12">
      <div className="w-full max-w-3xl card rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2 text-primary">
              Personal Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          {/* Role and Password */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-muted-foreground">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input w-full"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Profile Image</label>
            <div className="flex items-center gap-4">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="preview"
                className="w-16 h-16 rounded-full border border-border object-cover"
              />
              <input
                type="file"
                onChange={imageHandler}
                className="text-sm"
              />
            </div>
          </div>

          {/* Payment Info */}
          {role === "Auctioneer" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2 text-primary">
                Payment Method Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Bank Name</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="input w-full"
                  >
                    <option value="">Select Bank</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="UBL">UBL</option>
                    <option value="HBL">HBL</option>
                    <option value="Allied Bank">Allied Bank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Account Number</label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Account Holder Name</label>
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Easypaisa Account</label>
                  <input
                    type="number"
                    value={easypaisaAccountNumber}
                    onChange={(e) => setEasypaisaAccountNumber(e.target.value)}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">PayPal Email</label>
                  <input
                    type="email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
