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

import { useUpdateProductMutation } from "../../redux/slices/apiQuery";
import { ProductUpdateDto } from "../../misc/productTypes";
import { useGetAllCategoriesQuery } from "../../redux/slices/categoryApi";

type FormValuesType = ProductUpdateDto;

function UpdateProductForm({
  initialValue,
  setInfoFormModalOpen,
}: {
  initialValue: { productUpdateDto: ProductUpdateDto; productId: string };
  setInfoFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: categories } = useGetAllCategoriesQuery(null);
  const initialFormValues = initialValue.productUpdateDto;
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
    };
    await updateProductTrigger({
      id: initialValue.productId,
      updateData: submitData,
    });
  };

  const updateNotify = () => toast.success("Successfully updated product!");
  const errorNotify = () =>
    toast.error("Something went wrong, please try again");

  useEffect(() => {
    if (updateProductSuccess) {
      updateNotify();
    }
  }, [updateProductSuccess]);

  useEffect(() => {
    if (updateProductError) {
      errorNotify();
    }
  }, [updateProductError]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="form-row">
          <Controller
            name="title"
            control={control}
            rules={{
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
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                id="categoryOptions"
                color={errors.categoryId && "failure"}
                helperText={errors.categoryId && errors.categoryId.message}
                {...field}
              >
                <option value="">-- Select category-- </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name.replace(
                      category.name[0],
                      category.name[0].toUpperCase()
                    )}
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
              name={`images.${index}.url`}
              defaultValue={field.url}
              render={({ field }) => (
                <FloatingLabel
                  variant="outlined"
                  label={`Image URL ${index + 1}`}
                  type="text"
                  color={errors.images?.[index]?.url && "error"}
                  helperText={errors.images?.[index]?.url?.message}
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
          onClick={() => append({ url: "" })}
          className="btn-secondary"
        >
          Add Image URL
        </button>

        <button
          type="submit"
          className="btn-primary"
          disabled={updateProductLoading}
        >
          {updateProductLoading ? "Confirming ..." : "Confirm"}
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default UpdateProductForm;
