
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RegisterType, UserType } from "../../misc/userTypes";
import { useRegisterMutation } from "../../redux/slices/userApi";
import { useLoginContext } from "../../appHooks/useLoginContext";
import { useEffect } from "react";

function Register({
  setOpenRegisterModal,
}: {
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [registerTrigger, { isSuccess, isLoading, error }] = useRegisterMutation();
  const { setOpenLoginModal } = useLoginContext();

  const initialUserInfo = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    image: "",
  };
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: initialUserInfo,
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    registerTrigger(data as RegisterType);
  };

  const handleLoginViaRegister = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  };

  const errorNotify = () => toast.error("Something wrong with register, please try again later");
  useEffect(() => {
    if (error) {
      errorNotify();
    }
  }, [error]);

  if (isSuccess) {
    return (
      <div>
        <p className="my-4 text-center">Now you can login!</p>
        <button className="btn-primary" onClick={handleLoginViaRegister}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="form-row">
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Username should not be more than 20 characters",
              },
              minLength: {
                value: 3,
                message: "User name should not be less than 3 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Username"
                type="text"
                color={errors.username && "error"}
                helperText={errors.username && errors.username.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
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
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
        </div>

        <div className="form-row">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First anme is required",
              maxLength: {
                value: 20,
                message: "First anme should not be more than 20 characters",
              },
              minLength: {
                value: 2,
                message: "First anme should not be less than 2 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Firstname"
                type="text"
                color={errors.firstName && "error"}
                helperText={errors.lastName && errors.lastName.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
          <Controller
            name="lastName"
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
                label="Lastname"
                type="text"
                color={errors.lastName && "error"}
                helperText={errors.lastName && errors.lastName.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
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
              maxLength: {
                value: 20,
                message: "Password should not be more than 20 characters",
              },
              minLength: {
                value: 6,
                message: "Password should not be less than 6 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Password"
                type="password"
                color={errors.password && "error"}
                helperText={errors.password && errors.password.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Password is required",
              validate: (value) =>
                value === getValues("password") || "The passwords do not match",
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Confirm Password"
                type="password"
                color={errors.confirmPassword && "error"}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Avatar URL"
                type="text"
                helperText={errors.image && errors.image.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
        </div>
        <button
          type="submit"
          aria-label="Login"
          className="btn-primary self-center w-60"
          disabled={isLoading}
        >
          Confirm
        </button>
      </form>
      <p className="text-sm text-center my-2 text-gray-600 dark:text-gray-200">
        Already have account?{" "}
        <span
          className="underline cursor-pointer text-blue-700 dark:text-blue-400"
          onClick={handleLoginViaRegister}
        >
          Login
        </span>
      </p>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default Register;
