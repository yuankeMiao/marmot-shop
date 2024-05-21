import {
  ProductReadDto,
  ProductUpdateDto,
  ProductCreateDto,
} from "../../misc/productTypes";
import apiQueries from "../../redux/slices/apiQuery";
import { createStore } from "../../redux/store";
import { mockServer } from "../shared/mockServer";

import { waitFor } from "@testing-library/react";

let store = createStore();

beforeAll(() => {
  mockServer.listen();
});

beforeEach(() => {
  store = createStore();
});

afterEach(() => {
  mockServer.resetHandlers();
  store.dispatch(apiQueries.util.resetApiState());
});

afterAll(() => {
  mockServer.close();
});

describe("productQuery", () => {
  // test 1 : getAllProducts  -fulfill
  test("getAllProducts fulfill", async () => {
    const { data } = await store.dispatch(
      apiQueries.endpoints.getAllProducts.initiate({ limit: 2, offset: 0 })
    );

    expect(data?.products).toHaveLength(5);
    expect(data?.totalCount).toBe(15);
  });

  // test 2: loading status
  test("getAllProducts pending", async () => {
    store.dispatch(
      apiQueries.endpoints.getAllProducts.initiate({ limit: 2, offset: 0 })
    );

    await waitFor(() => {
      const status =
        store.getState().api.queries[`getAllProducts({"limit":2,"offset":0})`]
          ?.status;
      expect(status).toBe("pending");
    });
  });

  // test 3: get product by id
  test("getProductById", async () => {
    const { data } = await store.dispatch(
      apiQueries.endpoints.getProductById.initiate(
        "0b85429d-e09e-44ed-ba86-0872999f6d0b"
      )
    );

    expect(data.price).toBe(795.9);
  });

  // test 4: createNewProduct

  test("createNewProduct", async () => {
    const newProduct: ProductCreateDto = {
      title: "New Product",
      description: "New Product Description",
      price: 100,
      discountPercentage: 10,
      rating: 4,
      stock: 100,
      brand: "New Brand",
      categoryId: "703ebacb-964d-495e-93cf-a9c74baf6d9e",
      thumbnail: "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
      images: [{ url: "https://cdn.dummyjson.com/product-images/26/1.jpg" }],
    };

    let returnedData = await store
      .dispatch(apiQueries.endpoints.createNewProduct.initiate(newProduct))
      .then((data) => {
        if ("data" in data) {
          return data.data as ProductReadDto;
        } else {
          return null;
        }
      });

    expect(returnedData?.title).toBe("New Product");
  });

  //test 5: updateProduct
  test("updateProduct", async () => {
    const updatedProduct: ProductUpdateDto = {
      id: "0b85429d-e09e-44ed-ba86-0872999f6d0b",
      title: "Updated Product",
    };

    let returnedData = await store
      .dispatch(apiQueries.endpoints.updateProduct.initiate(updatedProduct))
      .then((data) => {
        if ("data" in data) {
          return data.data as ProductReadDto;
        } else {
          return null;
        }
      });

    expect(returnedData?.title).toBe("Updated Product");
  });

  // test 6: deleteProduct
  test("deleteProduct", async () => {
    let returnedData = await store
      .dispatch(
        apiQueries.endpoints.deleteProduct.initiate(
          "0b85429d-e09e-44ed-ba86-0872999f6d0b"
        )
      )
      .then((data) => {
        if ("data" in data) {
          return data.data as boolean;
        } else {
          return null;
        }
      });

    expect(returnedData).toBe(true);
  });
});
