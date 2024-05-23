import { Rating } from "flowbite-react";
import { ReviewReadDto } from "../../misc/reviewTypes";

const ReviewCard = ({ review }: { review: ReviewReadDto }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Rating.Star key={index} filled={index < review.rating} />
  ));

  return (
    <div className="py-4 border-b-2 border-gray-400">
      <Rating>
        {stars}
        <div className="ml-2">{review.rating}</div>
      </Rating>
      <div>{review.content}</div>
    </div>
  );
};

export default ReviewCard;
