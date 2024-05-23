import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Modal, Button } from "flowbite-react";
import { ReviewCreateDto } from "../../misc/reviewTypes";
import { useCreateReviewMutation } from "../../redux/slices/reviewApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateReviewForm = ({ productId, onClose }: { productId: string; onClose: () => void }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ReviewCreateDto>({
    defaultValues: {
      rating: 0,
      content: "",
      productId,
    },
  });

  const [createReviewTrigger, { isLoading, error, isSuccess }] = useCreateReviewMutation();

  const onSubmit: SubmitHandler<ReviewCreateDto> = async (data) => {
    createReviewTrigger(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review submitted successfully!");
      reset();
      onClose();
    }
    if (error) {
      toast.error("Error submitting review. Please try again.");
    }
  }, [isSuccess, error, reset, onClose]);

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <h3 className="text-lg font-medium">Write a Review</h3>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form-control dark:text-gray-100">
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Rating is required" }}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="mr-4">Rating:</label>
                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`mx-1 ${index < field.value ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => field.onChange(index + 1)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && <span className="text-red-500 text-sm ml-2">{errors.rating.message}</span>}
              </div>
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{
              maxLength: { value: 500, message: "Review content cannot exceed 500 characters" },
            }}
            render={({ field }) => (
              <div className="w-full">
                <textarea
                  {...field}
                  placeholder="Write your review here"
                  className="w-full dark:bg-gray-700"
                  rows={4}
                  maxLength={500}
                />
                {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
              </div>
            )}
          />
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
        <ToastContainer position="top-center" />
      </Modal.Body>
    </Modal>
  );
};

export default CreateReviewForm;
