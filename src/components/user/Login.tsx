
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel, Toast } from "flowbite-react";
import { LoginType } from "../../misc/userTypes";
import { useLoginMutation } from "../../redux/slices/userApi";
import LoginWithGoogle from "./LoginWithGoogle";
import { fetchCurrentUser, fetchCurrentUserWithGoogle } from "../../redux/slices/currentUserSlice";
import { useAppDispatch } from "../../appHooks/reduxHooks";
import { fetchUserCart } from "../../redux/slices/cartSlice";

function Login({
  setOpenLoginModal,
  setOpenRegisterModal,
}: {
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // i will handle the login status later, maybe using toast
  const [loginTrigger, { error: loginError }] = useLoginMutation();
  const [isSuccessWithGoogle, setIsSuccessWithGoogle] = useState(false);

  const handleRegisterViaLogin = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

   // when submit is clicked, trigger the login mutation
   const onSubmit: SubmitHandler<LoginType> = async (data) => {
    await loginTrigger(data)
      .unwrap()
      .then((result) => {
        window.localStorage.setItem("token", result.token);
        dispatch(fetchCurrentUser(result.token)).then((user) => {
          dispatch(fetchUserCart(user.payload.id));
        });

        setOpenLoginModal(false);
      })
      .catch((error) => {
        setError("password", {
          type: "manual",
          message: error.data.message,
        });
      });
  };

  useEffect(() => {
    if (isSuccessWithGoogle) {
      dispatch(fetchCurrentUserWithGoogle(localStorage.getItem("googleToken") || ""))
        .then(() => {
          setOpenLoginModal(false);
        });
    }
  }, [isSuccessWithGoogle, setOpenLoginModal, dispatch]);

  return (
    <div>
      <form
        className="mt-8 w-full p-4 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-3xl -mt-12 dark:text-gray-100">Login form</h3>
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
              className="dark:bg-gray-700 dark:inputDarkModeOverride"
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
              className="dark:bg-gray-700 dark:inputDarkModeOverride"
              {...field}
            />
          )}
        />
        <button
          type="submit"
          aria-label="Login"
          className="btn-primary self-center"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center my-2 text-gray-600 dark:text-gray-200">
        Don't have account yet?{" "}
        <span
          className="underline cursor-pointer text-blue-700 dark:text-blue-400"
          onClick={handleRegisterViaLogin}
        >
          Register
        </span>
      </p>
      <LoginWithGoogle setIsSuccessWithGoogle={setIsSuccessWithGoogle} />
      {loginError && (
        <Toast className="bg-red-200 dark:bg-red-500">
          <p className="text-xs text-sky-950 dark:text-gray-100">Something wrong with login, please try again!</p>
          <Toast.Toggle />
        </Toast>)}
    </div>
  );
}

export default Login;
