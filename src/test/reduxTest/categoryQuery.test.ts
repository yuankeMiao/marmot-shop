import apiQueries from "../../redux/slices/apiQuery";
import { createStore } from "../../redux/store";
import { productServer} from "../shared/productServer";

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

describe("categoryQuery", () => {
  
    // test 1: getProdctsByCategory and sorted

  test("getProductsByCategory-skincare-asc", async () => {
    const { data } = await store.dispatch(
      apiQueries.endpoints.getProductsByCategory.initiate({
        category: "skincare",
        limit: 12,
        skip: 0,
        sort: "asc",
      })
    );

    expect(data?.products).toHaveLength(1);
  });

  //test 2: getProductsByCategory-smartphones-desc
  test("getProductsByCategory-smartphones-desc", async () => {
   const {data, isSuccess} = await store.dispatch(
      apiQueries.endpoints.getProductsByCategory.initiate({
        category: "smartphones",
        limit: 12,
        skip: 0,
        sort: "desc",
      })
    )

    const products = data?.products

    expect(products).toBeDefined();
    expect(products).toHaveLength(3);
    expect(isSuccess).toBe(true);
    expect(products![0].price).toBeGreaterThanOrEqual(products![1].price); // added non-null assertion, otherwise TS doesnt know that products is non-null
  });

});