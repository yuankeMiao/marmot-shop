import { useEffect } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateUserMutation } from "../../redux/slices/userApi";
import { UserReadDto, UserUpdateDto } from "../../misc/userTypes";

type FormValuesType = UserUpdateDto;

function UpdateUserForm({
  initialValue,
  setInfoFormModalOpen,
}: {
  initialValue: UserReadDto;
  setInfoFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialFormValues: UserUpdateDto = {
    firstname: initialValue.firstname,
    lastname: initialValue.lastname,
    email: initialValue.email,
    avatar: initialValue.avatar,
  };

  const [
    updateUserTrigger,
    {
      isSuccess: updateUserSuccess,
      isLoading: updateUserLoading,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    const submitData = { ...data };
    await updateUserTrigger({
      id: initialValue.id,
      updateData: submitData,
    }).then((result) => {
      setInfoFormModalOpen(false);
    });
  };

  const updateNotify = () => toast.success("Successfully updated user!");
  const errorNotify = () => toast.error("Something went wrong, please try again");

  useEffect(() => {
    if (updateUserSuccess) {
      updateNotify();
      setInfoFormModalOpen(false);
    }
  }, [updateUserSuccess]);

  useEffect(() => {
    if (updateUserError) {
      errorNotify();
    }
  }, [updateUserError]);

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
        <button
          type="submit"
          className="btn-primary"
          disabled={updateUserLoading}
        >
          {updateUserLoading ? "Confirming ..." : "Confirm"}
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default UpdateUserForm;
