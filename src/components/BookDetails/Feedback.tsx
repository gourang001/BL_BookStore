import { useEffect, useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { getBookReviews } from "../../utils/API.js";
import { useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm.js";


interface Review {
  _id: string;
  user_id: {
    fullName: string;
  };
  rating: number;
  comment: string;
}

function Feedback() {
  const { id: routeBookId } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const bookId = routeBookId ?? "";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getBookReviews(bookId);
        setReviews(result);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
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
      {reviews.map((review) => (
        <div className="flex gap-3 py-2 items-start" key={review._id}>
          <div className="w-20 h-10 bg-[#F5F5F5] flex items-center justify-center rounded-full">
            <p className="text-[#707070]">
              {review.user_id?.fullName?.split(" ")[0]?.charAt(0).toUpperCase()}
              {review.user_id?.fullName?.split(" ")[1]?.charAt(0).toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#0A0102] font-semibold">{review.user_id?.fullName}</p>
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
    </div>
  );
}
export default Feedback;
