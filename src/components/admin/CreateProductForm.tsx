import React, { useEffect, useState, ChangeEvent } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { FloatingLabel, Select, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateNewProductMutation } from "../../redux/slices/apiQuery";
import { ProductCreateDto } from "../../misc/productTypes";
import { useGetAllCategoriesQuery } from "../../redux/slices/categoryApi";
import { CategoryReadDto } from "../../misc/categoryTypes";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function CreateProductForm({ setInfoFormModalOpen }: {
  setInfoFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: categories } = useGetAllCategoriesQuery();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [tempImg, setTempImg] = useState<string[]>([]);

  const emptyFormValues: ProductCreateDto = {
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: "",
    categoryId: categories?.[0]?.id || "",
    thumbnail: "",
    images: [],
  };

  const initialFormValues = emptyFormValues;

  const [
    createNewProductTrigger,
    {
      isSuccess: createNewProductSuccess,
      isLoading: createNewProductLoading,
      error: createNewProductError,
      reset: createNewProductReset,
    },
  ] = useCreateNewProductMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductCreateDto>({
    defaultValues: initialFormValues,
  });

  const { fields, append, remove, update } = useFieldArray({
    name: "images",
    control,
  });

  const uploadImageCallBack = async (file: File, productId: string): Promise<string> => {
    const postImgRef = ref(storage, `products/${productId}/${file.name}`);
    const snapshot = await uploadBytesResumable(postImgRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const uploadNewImage = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const newTempImg = [...tempImg];
    newTempImg[index] = URL.createObjectURL(file);
    setTempImg(newTempImg);

    const imgUrl = await uploadImageCallBack(file, "newProductId");
    update(index, { url: imgUrl });
  };

  const uploadThumbnail = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setThumbnailUrl(URL.createObjectURL(file));
    const imgUrl = await uploadImageCallBack(file, "newProductId");
    setThumbnailUrl(imgUrl);
    setValue("thumbnail", imgUrl);
  };

  const onSubmit: SubmitHandler<ProductCreateDto> = async (data) => {
    const submitData = { ...data, thumbnail: thumbnailUrl };
    console.log(submitData);
    await createNewProductTrigger(submitData);
  };

  const handleResetForm = () => {
    reset(initialFormValues);
    createNewProductReset();
    setTempImg([]);
  };

  const createNotify = () => toast.success("Successfully created product!");
  const errorNotify = () => toast.error("Something went wrong, please try again");

  useEffect(() => {
    if (createNewProductSuccess) {
      createNotify();
    }
  }, [createNewProductSuccess]);

  useEffect(() => {
    if (createNewProductError) {
      errorNotify();
    }
  }, [createNewProductError]);

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
            name="categoryId"
            control={control}
            rules={{
              required: "Category is required",
              validate: (value) => value !== "" || "Category is required",
            }}
            render={({ field }) => (
              <Select
                id="categoryOptions"
                color={errors.categoryId && "failure"}
                helperText={errors.categoryId && errors.categoryId.message}
                {...field}
              >
                <option value="">-- Select category --</option>
                {categories?.map((category: CategoryReadDto) => (
                  <option key={category.id} value={category.id}>
                    {category.name.replace(category.name[0], category.name[0].toUpperCase())}
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
                message: "Discount Percentage should not be more than 99",
              },
              min: {
                value: 0,
                message: "Discount Percentage should not be less than 0",
              },
            }}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Discount Percentage"
                type="number"
                color={errors.discountPercentage && "error"}
                helperText={errors.discountPercentage && errors.discountPercentage.message}
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
                message: "Stock should not be less than 0",
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
        <div className="form-row flex items-center gap-4">
          <label htmlFor="thumbnail" className="hidden">
            Upload Thumbnail
          </label>
          <div className="relative">
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={uploadThumbnail}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById('thumbnail')?.click()}
            >
              Upload Thumbnail
            </button>
          </div>
          {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail Preview" className="mt-4 h-20 w-20 object-cover rounded-full" />}
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="form-row flex items-center gap-4">
            <Controller
              control={control}
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
            <label htmlFor={`image-${index}`} className="hidden">
              Upload Image
            </label>
            <div className="relative">
              <input
                type="file"
                id={`image-${index}`}
                accept="image/*"
                onChange={(e) => uploadNewImage(e, index)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={() => document.getElementById(`image-${index}`)?.click()}
              >
                Upload Image
              </button>
            </div>
            {tempImg[index] && <img src={tempImg[index]} alt={`Preview ${index + 1}`} className="mt-4 h-20 w-20 object-cover rounded-full" />}
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
            disabled={createNewProductLoading}
          >
            {createNewProductLoading ? "Confirming ..." : "Confirm"}
          </button>
        )}
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default CreateProductForm;
