import { useEffect } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";

import { FloatingLabel, Select, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useCreateNewProductMutation,
  useUpdateProductMutation,
} from "../../redux/slices/apiQuery";
import { ProductType } from "../../misc/productTypes";
import { CATEGORIES } from "../../misc/constants";


/* fieldArray only accept array of object, but the data shape of my product images is array of string
    so I set a local type here, instead of setting it in types.ts
    since it is only used here */
type FormValuesType = Omit<ProductType, "images, id"> & {
  id?: number;
  images?: { value: string }[];
};

function ProductManageForm({
  initialValue,
  setInfoFormModalOpen,
}: {
  initialValue: ProductType | null;
  setInfoFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const emptyFormValues: FormValuesType = {
    id: 0,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  };

  const initialFormValues = initialValue
    ? {
        ...initialValue,
        images: initialValue.images.map((imageURL) => ({ value: imageURL })),
      }
    : (emptyFormValues as FormValuesType);

  const [
    createNewProductTrigger,
    {
      isSuccess: createNewProductSuccess,
      isLoading: createNewProductLoading,
      error: createNewProductError,
      reset: createNewProductReset,
    },
  ] = useCreateNewProductMutation();
  const [
    updateProductTrigger,
    {
      isSuccess: updateProductSuccess,
      isLoading: updateProductLoading,
      error: updateProductError,
    },
  ] = useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValuesType>({
    defaultValues: initialFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    const submitData = {
      ...data,
      images: (data.images as { value: string }[]).map(
        (imageOBJ) => imageOBJ.value
      ),
    };

    // console.log(submitData);
    if (initialValue) {
      await updateProductTrigger(submitData);
    } else {
      await createNewProductTrigger(submitData);
    }
  };

  const handleResetForm = () => {
    reset(initialFormValues);
    createNewProductReset();
  };

  const createNotify = () => toast.success("Successfully created product!");
  const updateNotify = () => toast.success("Successfully updated product!");
  const errorNotify = () => toast.error("Something went wrong, please try again");

  useEffect(() => {
    if (createNewProductSuccess) {
      createNotify();
    }
  }, [createNewProductSuccess]);

  useEffect(() => {
    if (updateProductSuccess) {
      updateNotify();
    }
  }, [updateProductSuccess]);

  useEffect(() => {
    if (createNewProductError || updateProductError) {
      errorNotify();
    }
  }, [createNewProductError, updateProductError]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="form-row">
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              maxLength: {
                value: 50,
                message: "Title should not be more than 50 characters",
              },
              minLength: {
                value: 3,
                message: "Title should not be less than 3 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Product title*"
                type="text"
                color={errors.title && "error"}
                helperText={errors.title && errors.title.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{
              required: "category is required",
              validate: (value) => value !== "" || "Category is required",
            }}
            render={({ field }) => (
              <Select
                id="categoryOptions"
                color={errors.category && "failure"}
                helperText={errors.category && errors.category.message}
                {...field}
              >
                <option value="">-- Select category-- </option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category.replace(category[0], category[0].toUpperCase())}
                  </option>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              max: {
                value: 99999,
                message: "Price should not be more than 99999",
              },
              min: {
                value: 1,
                message: "Price should not be less than 1",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Product Price*"
                type="number"
                color={errors.price && "error"}
                helperText={errors.price && errors.price.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
          <Controller
            name="discountPercentage"
            control={control}
            rules={{
              max: {
                value: 99,
                message: "DiscountPercentage should not be more than 99",
              },
              min: {
                value: 0,
                message: "DiscountPercentage should not be less than 0",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Discount Percentage"
                type="number"
                color={errors.discountPercentage && "error"}
                helperText={
                  errors.discountPercentage && errors.discountPercentage.message
                }
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>

        <div className="form-row">
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "Stock is required",
              max: {
                value: 99999,
                message: "Stock should not be more than 99999",
              },
              min: {
                value: 0,
                message: "Price should not be less than 0",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Product Stock*"
                type="number"
                color={errors.stock && "error"}
                helperText={errors.stock && errors.stock.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            rules={{
              maxLength: {
                value: 20,
                message: "Brand name should not be more than 20 characters",
              },
              minLength: {
                value: 3,
                message: "Brand name should not be less than 3 characters",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Brand"
                type="text"
                color={errors.brand && "error"}
                helperText={errors.brand && errors.brand.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description should not be more than 500 characters",
              },
              minLength: {
                value: 20,
                message: "Description should not be less than 20 characters",
              },
            }}
            render={({ field }) => (
              <Textarea
                placeholder="Product Description*"
                minLength={20}
                maxLength={500}
                color={errors.description && "failure"}
                helperText={errors.description && errors.description.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-row">
          <Controller
            name="thumbnail"
            control={control}
            rules={{
              required: "Thumbnail is required",
              pattern: {
                value: /\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
                message: "Invalid image url",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Thumbnail URL*"
                type="text"
                color={errors.thumbnail && "error"}
                helperText={errors.thumbnail && errors.thumbnail.message}
                className="dark:bg-gray-700"
                {...field}
              />
            )}
          />
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="form-row">
            <Controller
              control={control}
              rules={{
                pattern: {
                  value: /\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
                  message: "Invalid image url",
                },
              }}
              name={`images.${index}.value`}
              defaultValue={field.value || ""}
              render={({ field }) => (
                <FloatingLabel
                  variant="outlined"
                  label={`Image URL ${index + 1}`}
                  type="text"
                  className="dark:bg-gray-700"
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn-secondary"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="btn-secondary"
        >
          Add Image URL
        </button>

        {createNewProductSuccess ? (
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
              onClick={() => setInfoFormModalOpen(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="btn-primary"
            disabled={updateProductLoading || createNewProductLoading}
          >
            {updateProductLoading || createNewProductLoading
              ? "Confirming ..."
              : "Confirm"}
          </button>
        )}
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ProductManageForm;
