import React, { ChangeEvent, useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserUpdateDto } from "../../misc/userTypes";
import { useUpdateUserMutation } from "../../redux/slices/authApi";

function UpdateForm({ userInfo }: { userInfo: UserUpdateDto }) {
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatar || "");
  const [tempImg, setTempImg] = useState(userInfo.avatar || "");

  const [
    updateUserProfileTrigger,
    {
      isSuccess: updateIsSuccess,
      isLoading: updateLoading,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpdateDto>({
    defaultValues: { ...userInfo, avatar: "" }, 
  });

  const uploadImageCallBack = async (file: File): Promise<string> => {
    const postImgRef = ref(storage, `users/${file.name}`);
    const snapshot = await uploadBytesResumable(postImgRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setTempImg(URL.createObjectURL(file));
    const imgUrl = await uploadImageCallBack(file);
    setAvatarUrl(imgUrl);
  };

  const onSubmit: SubmitHandler<UserUpdateDto> = async (data) => {
    await updateUserProfileTrigger({ ...data, avatar: avatarUrl });
  };

  const handleReset = () => {
    reset();
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
              pattern: {
                value: /^[a-zA-Z]{2,20}$/,
                message: "First name should be 2-20 alphabetic characters",
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
              pattern: {
                value: /^[a-zA-Z]{2,20}$/,
                message: "Last name should be 2-20 alphabetic characters",
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

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-4">
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
