import { ProductType } from "../../misc/productTypes";
import apiQueries from "../../redux/slices/apiQuery";
import { createStore } from "../../redux/store";
import { productServer } from "../shared/productServer";

import { waitFor } from "@testing-library/react";

let store = createStore();

beforeAll(() => {
  productServer.listen();
});

beforeEach(() => {
  store = createStore();
});

afterEach(() => {
  productServer.resetHandlers();
});

afterAll(() => {
  productServer.close();
});

describe("productQuery", () => {
  // test 1 : getAllProducts  -fulfill
  test("getAllProducts fulfill", async () => {
    // I think this approach is a more RTKQ way to get the data, instead of unwrap them manually
    const { data } = await store.dispatch(
      apiQueries.endpoints.getAllProducts.initiate(2)
    );

    // // console.log(store.getState().api.queries["getAllProducts(2)"]);
    // const data = store.getState().api.queries["getAllProducts(2)"]
    //   ?.data;
    // const status = store.getState().api.queries["getAllProducts(2)"]?.status;

    expect(data).toHaveLength(2);
  });

  // test 2: loading status
  test("getAllProducts pending", async () => {
    store.dispatch(apiQueries.endpoints.getAllProducts.initiate(2));

    await waitFor(() => {
      const status = store.getState().api.queries["getAllProducts(2)"]?.status;
      expect(status).toBe("pending");
    });
  });

  // test 3: get product by id
  test("getProductById", async () => {
    const {data} =  await store.dispatch(apiQueries.endpoints.getProductById.initiate(1));

    expect(data.price).toBe(549);
  });

  // test 4: createNewProduct

  test("createNewProduct", async () => {
    const newProduct: Omit<ProductType, "id"> = {
      title: "New Product",
      description: "New Product Description",
      price: 100,
      discountPercentage: 10,
      rating: 4,
      stock: 100,
      brand: "New Brand",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
      images: [
        {url: "https://cdn.dummyjson.com/product-images/26/1.jpg"}
      ],
    };

    let returnedData = await store
      .dispatch(apiQueries.endpoints.createNewProduct.initiate(newProduct))
      .then((data) => {
        if ("data" in data) {
          return data.data as ProductType;
        } else {
          return null;
        }
      });

    expect(returnedData?.title).toBe("New Product");
  });

  // test 5: updateProduct
  // test("updateProduct", async () => {
  //   const updatedProduct: Partial<ProductType> = {
  //     id: 1,
  //     title: "Updated Product",
  //   };

  //   let returnedData = await store
  //     .dispatch(apiQueries.endpoints.updateProduct.initiate(updatedProduct))
  //     .then((data) => {
  //       if ("data" in data) {
  //         return data.data as ProductType;
  //       } else {
  //         return null;
  //       }
  //     });

  //   expect(returnedData?.title).toBe("Updated Product");
  // });

  // test 6: deleteProduct
//   test("deleteProduct", async () => {
//     let returnedData = await store
//       .dispatch(apiQueries.endpoints.deleteProduct.initiate(1))
//       .then((data) => {
//         if ("data" in data) {
//           // https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
//           // good to know this syntax!
//           return data.data as ProductType & {
//             isDeleted: boolean;
//             deletedOn: string;
//           };
//         } else {
//           return null;
//         }
//       });

//     expect(returnedData?.isDeleted).toBe(true);
//   });
// });
