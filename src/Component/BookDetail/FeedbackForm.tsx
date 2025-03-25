import React, { useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { addFeedback } from '../../Utils/API';
import { useNavigate } from 'react-router-dom';

function FeedbackForm({ productId }) { 
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      setError("Please provide a rating and comment.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const feedback = {
        comment,
        rating: rating.toString() 
      };
      const response = await addFeedback(productId, feedback);
      if (response.success) {
        setSuccess(true);
        setComment(""); 
        setRating(0);
      } else {
        setError(response.message || "Failed to submit feedback.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to submit feedback.";
      setError(errorMessage);
      if (errorMessage === 'No authentication token found. Please log in.') {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg">Customer Feedback</p>
      <div className="flex flex-col rounded-sm gap-2 bg-[#F5F5F5] p-4">
        <p className="text-xs font-semibold">Overall rating</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="cursor-pointer text-xl"
            >
              {star <= (hover || rating) ? (
                <IoStarSharp className="text-[#FFD700]" />
              ) : (
                <IoStarOutline className="text-[#707070]" />
              )}
            </span>
          ))}
        </div>
        <textarea
          className="w-full h-24 p-2 placeholder:text-sm"
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        />
        <div className="flex justify-end">
          <button
            className={`bg-[#3371B5] w-24 py-1 rounded-sm text-white text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">Feedback submitted successfully!</p>}
      </div>
    </div>
  );
}

export default FeedbackForm;