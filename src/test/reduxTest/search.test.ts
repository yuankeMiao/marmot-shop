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

// describe("searchQuery", () => {
//   test("searchProducts fulfill", async () => {
//     let data: any;
//     await store.dispatch(apiQueries.endpoints.getProductsBySearch.initiate("phone"))
//     .then((result) => {
//       // console.log(result);
//         data = result.data;
//     })
//     .catch((error) => {
//         console.log(error);
//     });

//     expect(data).toHaveLength(2);
//   });
// });
