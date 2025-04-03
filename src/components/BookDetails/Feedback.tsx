import React, { useEffect, useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { getBookReviews } from "../../utils/API";
import { useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

interface Review {
  _id: string;
  user_id: {
    fullName: string;
  };
  rating: number;
  comment: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return <p className="text-[#707070] text-center">No reviews yet.</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <div className="flex gap-3 py-2 items-start" key={review._id}>
          <div className="w-20 h-10 bg-[#F5F5F5] flex items-center justify-center rounded-full">
            <p className="text-[#707070]">
              {review.user_id.fullName.split(" ")[0].charAt(0).toUpperCase()}
              {review.user_id.fullName.split(" ")[1]?.charAt(0).toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#0A0102] font-semibold">{review.user_id.fullName}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-xl">
                  {star <= review.rating ? (
                    <IoStarSharp className="text-[#FFD700]" />
                  ) : (
                    <IoStarOutline className="text-[#707070]" />
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#707070]">{review.comment}</p>
          </div>
        </div>
      ))}
    </>
  );
};

function Feedback() {
  const { id: routeBookId } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const bookId = routeBookId ?? "";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!bookId) {
          throw new Error("No book ID provided");
        }
        const result = await getBookReviews(bookId);
        setReviews(result as Review[]);
      } catch (error) {
        setError("Failed to load reviews. Please try again later.");
        console.error("Error fetching reviews:", error);
      }
    };

    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  const handleNewReview = (newReview: Review) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <div>
      <FeedbackForm bookId={bookId} onReviewSubmitted={handleNewReview} />
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </div>
  );
}

export default Feedback;