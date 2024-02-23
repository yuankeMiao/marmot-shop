import apiQueries from "../../redux/slices/apiQuery";
import { createStore } from "../../redux/store";
import { productServer } from "../shared/productServer";

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

productServer.events.on("request:start", (request) => {
    console.log("request started", request);
    }
);

// productServer.events.on("request:match", (request) => {
//     console.log("request matched", request);
//     }
// );

// productServer.events.on("request:end", (request) => {
//     console.log("request ended", request);
//     }
// );


describe("searchQuery", () => {
  test("searchProducts fulfill", async () => {
    let data: any;
    await store.dispatch(apiQueries.endpoints.getProductsBySearch.initiate("phone"))
    .then((result) => {
      console.log(result);
        data = result.data;
    })
    .catch((error) => {
        console.log(error);
    });

    expect(data).toHaveLength(3);
  });
});
