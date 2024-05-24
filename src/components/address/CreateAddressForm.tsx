import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabel } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAddAddressMutation } from "../../redux/slices/userApi";
import { AddressCreateDto } from "../../misc/userTypes";

function CreateAddressForm({
  setShowAddModal,
}: {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const emptyFormValues: AddressCreateDto = {
    recipient: "",
    phone: "",
    line1: "",
    line2: "",
    postalCode: "",
    city: "",
  };

  const initialFormValues = emptyFormValues as AddressCreateDto;

  const [
    createAddressTrigger,
    {
      isSuccess: createAddressSuccess,
      isLoading: createAddressLoading,
      error: createAddressError,
      reset: createAddressReset,
    },
  ] = useAddAddressMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressCreateDto>({
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<AddressCreateDto> = async (data) => {
    const submitData = { ...data };
    await createAddressTrigger(submitData);
  };

  const handleResetForm = () => {
    reset(initialFormValues);
    createAddressReset();
  };

  const createNotify = () => toast.success("Successfully created address!");
  const errorNotify = () => toast.error("Failed to create address");

  useEffect(() => {
    if (createAddressSuccess) {
      createNotify();
      setShowAddModal(false);
    }
  }, [createAddressSuccess, setShowAddModal]);

  useEffect(() => {
    if (createAddressError) {
      errorNotify();
    }
  }, [createAddressError]);


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="form-row">
          <Controller
            name="recipient"
            control={control}
            rules={{ required: "Recipient is required" }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Recipient*"
                type="text"
                color={errors.recipient && "error"}
                helperText={errors.recipient && errors.recipient.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Phone*"
                type="text"
                color={errors.phone && "error"}
                helperText={errors.phone && errors.phone.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="line1"
            control={control}
            rules={{ required: "Line 1 is required" }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Line 1*"
                type="text"
                color={errors.line1 && "error"}
                helperText={errors.line1 && errors.line1.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="line2"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Line 2"
                type="text"
                color={errors.line2 && "error"}
                helperText={errors.line2 && errors.line2.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="postalCode"
            control={control}
            rules={{ required: "Postal code is required" }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Postal Code*"
                type="text"
                color={errors.postalCode && "error"}
                helperText={errors.postalCode && errors.postalCode.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="City*"
                type="text"
                color={errors.city && "error"}
                helperText={errors.city && errors.city.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        {createAddressSuccess ? (
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
              onClick={() => setShowAddModal(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="btn-primary"
            disabled={createAddressLoading}
          >
            {createAddressLoading ? "Confirming ..." : "Confirm"}
          </button>
        )}
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default CreateAddressForm;
