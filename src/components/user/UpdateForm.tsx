import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserUpdateDto } from "../../misc/userTypes";
import { useUpdateUserMutation } from "../../redux/slices/authApi";
import { useEffect } from "react";

function UpdateForm({ userInfo }: { userInfo: UserUpdateDto }) {
  const [
    updateUserProfileTrigger,
    {
      isSuccess: updateIsSuccess,
      isLoading: updateLoading,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpdateDto>({
    defaultValues: userInfo,
  });

  const onSubmit: SubmitHandler<UserUpdateDto> = (data) => {
    updateUserProfileTrigger(data);
  };

  const handleReset = () => {
    reset();
    updateReset();
  };

  const successNotify = () => toast.success("Update successful");
  const errorNotify = () =>
    toast.error("Something went wrong with the update, please try again later");

  useEffect(() => {
    if (updateIsSuccess) {
      successNotify();
    }
  }, [updateIsSuccess]);

  useEffect(() => {
    if (updateError) {
      errorNotify();
    }
  }, [updateError]);

  return (
    <div className="dark:bg-gray-700 py-4 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="form-row">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "E-mail is required",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Email"
                type="email"
                color={errors.email && "error"}
                helperText={errors.email && errors.email.message}
                className="dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
        </div>

        <div className="form-row">
          <Controller
            name="firstname"
            control={control}
            rules={{
              required: "First name is required",
              maxLength: {
                value: 20,
                message: "First name should not be more than 20 characters",
              },
              minLength: {
                value: 2,
                message: "First name should not be less than 2 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="First Name"
                type="text"
                color={errors.firstname && "error"}
                helperText={errors.firstname && errors.firstname.message}
                className="dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{
              required: "Last name is required",
              maxLength: {
                value: 20,
                message: "Last name should not be more than 20 characters",
              },
              minLength: {
                value: 3,
                message: "Last name should not be less than 3 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Last Name"
                type="text"
                color={errors.lastname && "error"}
                helperText={errors.lastname && errors.lastname.message}
                className="dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <button
            type="submit"
            aria-label="Confirm"
            className="btn-primary self-center w-60"
            disabled={updateLoading}
          >
            {updateLoading ? "Confirming..." : "Confirm"}
          </button>
          <button
            type="button"
            aria-label="Reset"
            className="btn-primary self-center w-60"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default UpdateForm;
