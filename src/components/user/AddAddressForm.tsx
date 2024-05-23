import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Modal } from "flowbite-react";
import { AddressReadDto } from "../../misc/userTypes";

interface AddAddressFormProps {
  onClose: () => void;
  onSubmit: (data: AddressReadDto) => void;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onClose, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<AddressReadDto>({
    defaultValues: {
      recipient: "",
      phone: "",
      line1: "",
      line2: "",
      postalCode: "",
      city: ""
    }
  });

  const handleFormSubmit: SubmitHandler<AddressReadDto> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>Add New Address</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient</label>
            <Controller
              name="recipient"
              control={control}
              rules={{ required: "Recipient is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            />
            {errors.recipient && <span className="text-red-500 text-sm">{errors.recipient.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Line 1</label>
            <Controller
              name="line1"
              control={control}
              rules={{ required: "Line 1 is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            />
            {errors.line1 && <span className="text-red-500 text-sm">{errors.line1.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Line 2</label>
            <Controller
              name="line2"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <Controller
              name="postalCode"
              control={control}
              rules={{ required: "Postal Code is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            />
            {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            />
            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
          </div>

          <div className="flex justify-end mt-4">
            <Button color="gray" onClick={onClose} type="button" className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Add Address</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAddressForm;
