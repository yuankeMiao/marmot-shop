import {
  CategoryCreateDto,
  CategoryReadDto,
  CategoryUpdateDto,
} from "../../misc/categoryTypes";
import categoryApi from "../../redux/slices/categoryApi";
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
  store.dispatch(categoryApi.util.resetApiState());
});

afterAll(() => {
  mockServer.close();
});

describe("categoryApi", () => {
  // test 1: getAllCategories - fulfill
  test("getAllCategories fulfill", async () => {
    const { data } = await store.dispatch(
      categoryApi.endpoints.getAllCategories.initiate(null)
    );

    expect(data).toHaveLength(5);
  });

  // test 2: loading status
  test("getAllCategories pending", async () => {
    store.dispatch(categoryApi.endpoints.getAllCategories.initiate(null));

    await waitFor(() => {
      const status =
        store.getState().api.queries[`getAllCategories(null)`]?.status;
      expect(status).toBe("pending");
    });
  });

  // test 3: getCategoryById
  test("getCategoryById", async () => {
    const { data } = await store.dispatch(
      categoryApi.endpoints.getCategoryById.initiate(
        "c9ca9167-f233-41c5-a7cf-310668112cdb"
      )
    );

    expect(data.name).toBe("Sport"); 
  });

  // test 4: createCategory
  test("createCategory", async () => {
    const newCategory: CategoryCreateDto = {
      name: "New Category",
      image: "https://picsum.photos/640/480/?image=43",
    };

    let returnedData = await store
      .dispatch(categoryApi.endpoints.createCategory.initiate(newCategory))
      .then((data) => {
        if ("data" in data) {
          return data.data as CategoryReadDto;
        } else {
          return null;
        }
      });

    expect(returnedData?.name).toBe("New Category");
  });

  // test 5: updateCategory
  test("updateCategory", async () => {
    const updatedCategory: CategoryUpdateDto = {
      id: "c9ca9167-f233-41c5-a7cf-310668112cdb",
      name: "Updated Category",
    };

    let returnedData = await store
      .dispatch(categoryApi.endpoints.updateCategory.initiate(updatedCategory))
      .then((data) => {
        if ("data" in data) {
          return data.data as CategoryReadDto;
        } else {
          return null;
        }
      });

    expect(returnedData?.name).toBe("Updated Category");
  });

  // test 6: deleteCategory
  test("deleteCategory", async () => {
    let returnedData = await store
      .dispatch(
        categoryApi.endpoints.deleteCategory.initiate(
            "c9ca9167-f233-41c5-a7cf-310668112cdb"
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
