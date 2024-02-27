import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";

import { FloatingLabel, Select, Label, Textarea, Toast } from "flowbite-react";

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
}: {
  initialValue: ProductType | null;
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

        {(createNewProductError || updateProductError) && (
          <Toast className="bg-red-200">
            <p className="text-sm text-black">Something wrong!</p>
            <Toast.Toggle />
          </Toast>
        )}

        {(createNewProductSuccess || updateProductSuccess) && (
          <Toast className="bg-green-200">
            <div className="text-sm text-black">
              <p>
                {initialValue
                  ? "Product updated!"
                  : "Product created!"}
              </p>
              <p>You can close this dialogue now</p>
            </div>

            <Toast.Toggle />
          </Toast>
        )}
        <button
          type="submit"
          className="btn-primary"
          disabled={updateProductLoading || createNewProductLoading}
        >
          {updateProductLoading || createNewProductLoading
            ? "Confirming ..."
            : "Confirm"}
        </button>
      </form>
    </div>
  );
}

export default ProductManageForm;
