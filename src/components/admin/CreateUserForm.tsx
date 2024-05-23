import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateUserMutation } from "../../redux/slices/userApi";
import { UserCreateDto } from "../../misc/userTypes";

function CreateUserForm({
  setInfoFormModalOpen,
}: {
  setInfoFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const emptyFormValues: UserCreateDto = {
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
    password: "",
    role: "Customer", // Default role
  };

  const initialFormValues = emptyFormValues as UserCreateDto;

  const [
    createUserTrigger,
    {
      isSuccess: createUserSuccess,
      isLoading: createUserLoading,
      error: createUserError,
      reset: createUserReset,
    },
  ] = useCreateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreateDto>({
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<UserCreateDto> = async (data) => {
    const submitData = data;
    await createUserTrigger(submitData);
  };

  const handleResetForm = () => {
    reset(initialFormValues);
    createUserReset();
  };

  const createNotify = () => toast.success("Successfully created user!");
  const errorNotify = () => toast.error("Something went wrong, please try again");

  useEffect(() => {
    if (createUserSuccess) {
      createNotify();
    }
  }, [createUserSuccess]);

  useEffect(() => {
    if (createUserError) {
      errorNotify();
    }
  }, [createUserError]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
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
                label="First Name*"
                type="text"
                color={errors.firstname && "error"}
                helperText={errors.firstname && errors.firstname.message}
                className="dark:bg-gray-700"
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
                label="Last Name*"
                type="text"
                color={errors.lastname && "error"}
                helperText={errors.lastname && errors.lastname.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Email*"
                type="email"
                color={errors.email && "error"}
                helperText={errors.email && errors.email.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should not be less than 6 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Password*"
                type="password"
                color={errors.password && "error"}
                helperText={errors.password && errors.password.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Avatar URL"
                type="text"
                color={errors.avatar && "error"}
                helperText={errors.avatar && errors.avatar.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>

        {createUserSuccess ? (
          <div className="flex justify-between gap-4">
            <button
              type="reset"
              className="btn-primary"
              onClick={handleResetForm}
            >
              Create another
            </button>
            <button
              className="btn-primary"
              onClick={() => setInfoFormModalOpen(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="btn-primary"
            disabled={createUserLoading}
          >
            {createUserLoading ? "Confirming ..." : "Confirm"}
          </button>
        )}
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default CreateUserForm;
