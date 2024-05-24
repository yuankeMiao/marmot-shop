import React, { ChangeEvent, useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { RegisterType } from "../../misc/userTypes";
import { useRegisterMutation } from "../../redux/slices/authApi";
import { useLoginContext } from "../../appHooks/useLoginContext";

function Register({
  setOpenRegisterModal,
}: {
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [tempImg, setTempImg] = useState(
    "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2378&q=80"
  );
  const [registerTrigger, { isSuccess, isLoading, error }] = useRegisterMutation();
  const { setOpenLoginModal } = useLoginContext();

  const initialUserInfo = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  };

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: initialUserInfo,
  });

  const uploadImageCallBack = async (file: File): Promise<string> => {
    // Upload image to storage
    const postImgRef = ref(storage, `users/${file.name}`);

    // Upload the image and wait for it to complete
    const snapshot = await uploadBytesResumable(postImgRef, file);

    // Get the download URL and return it
    return await getDownloadURL(snapshot.ref);
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    // Set temp image for preview
    setTempImg(URL.createObjectURL(file));
    // Upload image to storage and get url
    const imgUrl = await uploadImageCallBack(file);
    // Set image
    // console.log(imgUrl);
    setAvatarUrl(imgUrl);
  };

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    registerTrigger({
      ...data,
      avatar: avatarUrl,
      role: "Customer",
    });
  };

  const handleLoginViaRegister = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  };

  const errorNotify = () =>
    toast.error("Something wrong with register, please try again later");

  useEffect(() => {
    if (error) {
      errorNotify();
    }
  }, [error]);

  if (isSuccess) {
    return (
      <div className="dark:text-gray-100">
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
            name="firstname"
            control={control}
            rules={{
              required: "First name is required",
              pattern: {
                value: /^[a-zA-Z]{2,20}$/,
                message: "First name should be 2-20 alphabetic characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Firstname"
                type="text"
                color={errors.firstname && "error"}
                helperText={errors.firstname && errors.firstname.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
                {...field}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{
              required: "Last name is required",
              pattern: {
                value: /^[a-zA-Z]{2,20}$/,
                message: "Last name should be 2-20 alphabetic characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Lastname"
                type="text"
                color={errors.lastname && "error"}
                helperText={errors.lastname && errors.lastname.message}
                className="inputOverride dark:bg-gray-700 dark:inputDarkModeOverride"
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
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

        <div className="form-row flex items-center gap-4">
          <label htmlFor="avatar" className="hidden">
            Upload Avatar
          </label>
          <div className="relative">
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={uploadAvatar}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById('avatar')?.click()}
            >
              Upload avatar from local
            </button>
          </div>
          {tempImg && <img src={tempImg} alt="Avatar Preview" className="mt-4 h-20 w-20 object-cover rounded-full" />}
        </div>

        <button
          type="submit"
          aria-label="Register"
          className="btn-primary self-center w-60 mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center my-2 text-gray-600 dark:text-gray-200">
        Already have an account?{" "}
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
