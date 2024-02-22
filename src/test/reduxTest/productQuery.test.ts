import { ProductType } from "../../misc/productTypes";
import apiQueries from "../../redux/slices/apiQuery";
import { createStore } from "../../redux/store";
import { productServer } from "../shared/productServer";

let store = createStore();

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe("productQuery", () => {
  // test 1 : getAllProducts
  test("getAllProducts", async () => {
    await store.dispatch(apiQueries.endpoints.getAllProducts.initiate(2));

    // console.log(store.getState().api.queries["getAllProducts(2)"]);
    const data = store.getState().api.queries["getAllProducts(2)"]
      ?.data as ProductType[];

    expect(data).toHaveLength(2);
  });

  // test 2: getProdctsByCategory and sorted

  test("getProductsByCategory-skincare-asc", async () => {
    await store.dispatch(
      apiQueries.endpoints.getProductsByCategory.initiate({
        category: "skincare",
        sort: "asc",
      })
    );

    // console.log(store.getState().api.queries['getProductsByCategory({"category":"skincare","sort":"asc"})']?.data);
    const data = store.getState().api.queries[
      'getProductsByCategory({"category":"skincare","sort":"asc"})'
    ]?.data as ProductType[];
    // console.log(data);

    expect(data).toHaveLength(1);
  });

//test 3: getProductsByCategory-smartphones-desc
  test("getProductsByCategory-smartphones-desc", async () => {
    await store.dispatch(
      apiQueries.endpoints.getProductsByCategory.initiate({
        category: "smartphones",
        sort: "desc",
      })
    );

    const data = store.getState().api.queries[
      'getProductsByCategory({"category":"smartphones","sort":"desc"})'
    ]?.data as ProductType[];
    // console.log(data);

    expect(data).toHaveLength(3);
    expect(data[0].price).toBeGreaterThanOrEqual(data[1].price);
  });

  // test 4: getSortedProducts-asc
  test("getSortedProducts-asc", async () => {
    await store.dispatch(
      apiQueries.endpoints.getSortedProducts.initiate({ limit: 5, sort: "asc" })
    );

    const data = store.getState().api.queries[
      'getSortedProducts({"limit":5,"sort":"asc"})'
    ]?.data as ProductType[];
    // console.log(data);

    expect(data).toHaveLength(5);
    expect(data[0].price).toBeLessThanOrEqual(data[1].price);
  });

  // test 5: getSortedProducts-desc
    test("getProductById", async () => {
        await store.dispatch(apiQueries.endpoints.getProductById.initiate(1));
    
        const data = store.getState().api.queries["getProductById(1)"]
        ?.data as ProductType;
    
        expect(data.price).toBe(549);
    });


    // test 6: getProductsBySearch
    test("getProductsBySearch", async () => {
        await store.dispatch(apiQueries.endpoints.getProductsBySearch.initiate("phone"));
    
        const data = store.getState().api.queries['getProductsBySearch("phone")']
        ?.data as ProductType[];

        // console.log(store.getState().api.queries);
    
        expect(data).toHaveLength(2);
    });

    // test 7: createNewProduct

    test("createNewProduct", async () => {
        const newProduct: Omit<ProductType, 'id'> = {
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
                "https://cdn.dummyjson.com/product-images/26/1.jpg",
                "https://cdn.dummyjson.com/product-images/26/2.jpg",
                "https://cdn.dummyjson.com/product-images/26/3.jpg",
                "https://cdn.dummyjson.com/product-images/26/4.jpg",
                "https://cdn.dummyjson.com/product-images/26/5.jpg",
                "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
            ],
        };
    
        let retrunedData = await store.dispatch(apiQueries.endpoints.createNewProduct.initiate(newProduct)).then((data) => {
            if ('data' in data) {
                return data.data as ProductType;
            } else {
                return null;
            }
        });
    
        expect(retrunedData?.title).toBe("New Product");
    });

});
