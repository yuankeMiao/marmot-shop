// this form is for register and update user info
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel, Toast } from "flowbite-react";

import { UserType } from "../../misc/userTypes";
import {
  useUpdateUserMutation,
} from "../../redux/slices/userApi";

function UserInfoForm({
  userInfo,
}: {
  userInfo: UserType;
}) {
  const [
    updateUserTrigger,
    { isSuccess: updateIsSuccess, error: updateError },
  ] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: userInfo,
  });

  const onSubmit: SubmitHandler<UserType> = (data) => {
    updateUserTrigger(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
        <div className="w-full grid grid-flow-col justify-stretch space-x-4">
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
                helperText={errors.email && errors.email.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-full grid grid-flow-col justify-stretch space-x-4">
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
                helperText={errors.lastName && errors.lastName.message}
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
                helperText={errors.lastName && errors.lastName.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-full grid grid-flow-col justify-stretch space-x-4">
          <Controller
            name="address.address"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Address"
                type="text"
                {...field}
              />
            )}
          />
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="City"
                type="text"
                {...field}
              />
            )}
          />
        </div>
        <div className="w-full grid grid-flow-col justify-stretch space-x-4">
          <Controller
            name="address.state"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="State"
                type="text"
                {...field}
              />
            )}
          />
          <Controller
            name="address.postalCode"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Postal Code"
                type="text"
                {...field}
              />
            )}
          />
        </div>
        <button
          type="submit"
          aria-label="Login"
          className="btn-primary self-center w-60"
        >
          Confirm Change
        </button>
      </form>
      {updateIsSuccess && (
        <Toast className="absolute">
            <p className="text-sm text-teal-500">Info updated!</p>
            <Toast.Toggle></Toast.Toggle>
        </Toast>
    )}
    </>
  );
}

export default UserInfoForm;
