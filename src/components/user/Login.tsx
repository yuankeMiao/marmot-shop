import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";

import { LoginType } from "../../misc/userTypes";
import { useLoginMutation } from "../../redux/slices/userApi";

function Login({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [loginTrigger] = useLoginMutation();

  // when submit is clicked, trigger the login mutation
  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    // console.log(data);
    await loginTrigger(data)
      .unwrap()
      .then((result) => {
        window.localStorage.setItem("token", result?.token);
        setOpenModal(false);
      })
      .catch((error) => {
        setError("password", {
          type: "manual",
          message: error.data.message,
        });
      });
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
    </div>
  );
}

export default Login;
