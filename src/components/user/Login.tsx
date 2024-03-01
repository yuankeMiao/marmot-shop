import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";

import { LoginType } from "../../misc/userTypes";
import { useLoginMutation } from "../../redux/slices/userApi";


function Login({
  setOpenLoginModal,
  setOpenRegisterModal
}: {
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>,
}) {
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
  const [loginTrigger, {error: loginError}] = useLoginMutation();

  // when submit is clicked, trigger the login mutation
  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    await loginTrigger(data)
      .unwrap()
      .then((result) => {
        window.localStorage.setItem("token", result.token);
        setOpenLoginModal(false);
      })
      .catch((error) => {
        setError("password", {
          type: "manual",
          message: error.data.message,
        });
      });
  };

  const handleRegisterViaLogin = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

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
              className="dark:bg-gray-700"
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
              className="dark:bg-gray-700"
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
          className="underline cursor-pointer text-blue-700"
          onClick={handleRegisterViaLogin}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;
