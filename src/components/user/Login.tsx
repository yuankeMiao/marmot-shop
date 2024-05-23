import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FloatingLabel } from "flowbite-react";

import { UserCredential } from "../../misc/userTypes";
import {
  useLazyGetProfileQuery,
  useLoginMutation,
} from "../../redux/slices/authApi";
import { useLoginContext } from "../../appHooks/useLoginContext";

function Login({
  setOpenRegisterModal,
}: {
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLogging, setIsLogging] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserCredential>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginTrigger, { error: loginError }] = useLoginMutation();
  const [getProfileTrigger, { error: getProfileError }] = useLazyGetProfileQuery();

  const { setOpenLoginModal } = useLoginContext();

  const handleRegisterViaLogin = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

  const onSubmit: SubmitHandler<UserCredential> = async (data) => {
    setIsLogging(true);
    try {
      const loginResult = await loginTrigger(data).unwrap();
      window.localStorage.setItem("accessToken", loginResult.accessToken);
      window.localStorage.setItem("refreshToken", loginResult.refreshToken);
      const profileResult = await getProfileTrigger().unwrap();
      if (profileResult) {
        setOpenLoginModal(false);
        window.location.reload();
      }
    } catch (err: any) {
      setError("password", {
        type: "manual",
        message: err?.data?.message || "Login failed",
      });
      toast.error("Something wrong with login, please try again!");
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div>
      <form
        className="mt-8 w-full p-4 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-3xl -mt-12 dark:text-gray-100">Login form</h3>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            maxLength: {
              value: 50,
              message: "Email should not be more than 50 characters",
            },
            minLength: {
              value: 5,
              message: "Email should not be less than 5 characters",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
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
        <button
          type="submit"
          aria-label="Login"
          className="btn-primary self-center"
          disabled={isLogging}
        >
          {isLogging ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-center my-2 text-gray-600 dark:text-gray-200">
        Don't have an account yet?{" "}
        <span
          className="underline cursor-pointer text-blue-700 dark:text-blue-400"
          onClick={handleRegisterViaLogin}
        >
          Register
        </span>
      </p>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default Login;
