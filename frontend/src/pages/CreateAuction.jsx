import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  return (
    <article className="min-h-screen w-full px-5 pt-20 lg:pl-[320px] bg-background flex flex-col items-center text-foreground">
      <h1 className="text-primary text-4xl sm:text-5xl font-extrabold mb-8 text-center">
        Create Your Auction
      </h1>

      <div className="w-full max-w-4xl card rounded-2xl p-8 sm:p-10">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleCreateAuction}
        >
          <p className="font-semibold text-2xl text-primary text-center">
            Auction Details
          </p>

          {/* Title and Category */}
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-muted-foreground font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Enter auction title"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-1">
              <label className="text-muted-foreground font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
                required
              >
                <option value="">Select Category</option>
                {auctionCategories.map((element) => (
                  <option
                    key={element}
                    value={element}
                  >
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition and Starting Bid */}
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-muted-foreground font-medium mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="input"
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-1">
              <label className="text-muted-foreground font-medium mb-1">
                Starting Bid (₹)
              </label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="input"
                placeholder="Enter starting bid"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-muted-foreground font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="input"
              placeholder="Describe the auction item..."
              required
            />
          </div>

          {/* Start and End Times */}
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-muted-foreground font-medium mb-1">
                Auction Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="input w-full"
                placeholderText="Select start time"
              />
            </div>

            <div className="flex flex-col sm:flex-1">
              <label className="text-muted-foreground font-medium mb-1">
                Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="input w-full"
                placeholderText="Select end time"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-xl text-primary">
              Upload Auction Image
            </label>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-2xl cursor-pointer bg-accent/50 hover:bg-accent transition-all duration-300"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={title}
                  className="w-44 h-auto rounded-lg shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <svg
                    className="w-10 h-10 mb-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9l-3-3m0 0L9 6m3-3l3 3"
                    />
                  </svg>
                  <p className="font-medium">Click to upload or drag & drop</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, GIF (max 800x400)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={imageHandler}
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary mt-6 mx-auto w-1/2"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateAuction;
