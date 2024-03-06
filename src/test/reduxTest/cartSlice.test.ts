import { createStore } from "../../redux/store";
import { CartItemType, CartState } from "../../misc/productTypes";
import cartReducer, {
  fetchUserCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { cartServer } from "../../test/shared/cartServer";

const initialState: CartState = {
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 0,
  totalProducts: 0,
  totalQuantity: 0,
  loading: false,
};

let store = createStore();

beforeAll(() => {
  cartServer.listen();
});

beforeEach(() => {
  store = createStore();
});

afterAll(() => {
  cartServer.close();
});

describe("cartSlice", () => {
  const mockCartItems: CartItemType[] = [
    {
      id: 59,
      title: "Spring and summershoes",
      price: 20,
      quantity: 3,
      total: 60,
      discountPercentage: 8.71,
      discountedPrice: 55,
      stock: 10,
      thumbnail: "https://cdn.dummyjson.com/product-images/59/thumbnail.jpg",
    },
    {
      id: 88,
      title: "TC Reusable Silicone Magic Washing Gloves",
      price: 29,
      quantity: 2,
      total: 58,
      discountPercentage: 3.19,
      discountedPrice: 56,
      stock: 5,
      thumbnail: "https://cdn.dummyjson.com/product-images/88/thumbnail.jpg",
    },
    {
      id: 18,
      title: "Oil Free Moisturizer 100ml",
      price: 40,
      quantity: 2,
      total: 80,
      discountPercentage: 13.1,
      discountedPrice: 70,
      stock: 10,
      thumbnail: "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
    },
  ];
  //test 0: initial state

  test("should return the initial state", () => {
    const state = cartReducer(initialState, { type: "" });
    expect(state).toEqual(initialState);
  });

  //test 1: add to cart
  test("should add a product to the cart", () => {
    const state = cartReducer(initialState, addToCart(mockCartItems[0]));
    expect(state.total).toEqual(60);
    expect(state.discountedTotal).toEqual(55);
    expect(state.totalProducts).toEqual(1);
    expect(state.totalQuantity).toEqual(3);
  });

  //test 2: update quantity
  test("should update the quantity of the item in the cart", () => {
    const state = cartReducer(initialState, addToCart(mockCartItems[0]));
    const updatedState = cartReducer(
      state,
      updateQuantity({ id: 59, quantity: 5 })
    );
    expect(updatedState.total).toEqual(100);
    expect(updatedState.discountedTotal).toEqual(91);
    expect(updatedState.totalProducts).toEqual(1);
    expect(updatedState.totalQuantity).toEqual(5);
  });

  //test 3: remove from cart  
  test("should remove the item from the cart", () => {
    const state = cartReducer(initialState, addToCart(mockCartItems[1]));
    const updatedState = cartReducer(state, removeFromCart(88));
    expect(updatedState.total).toEqual(0);
    expect(updatedState.discountedTotal).toEqual(0);
    expect(updatedState.totalProducts).toEqual(0);
    expect(updatedState.totalQuantity).toEqual(0);
  });

  test("should merge the guest cart with the user cart", async () => {
    //add some items to the cart, so i can test if they merged
    store.dispatch(addToCart(mockCartItems[0]));

    await store.dispatch(fetchUserCart(97));
    const state = store.getState().cart;
    expect(state.total).toEqual(2328 + 60);
    expect(state.userId).toEqual(97);
    expect(state.totalProducts).toEqual(6);
    expect(state.totalQuantity).toEqual(13);
  });

  // fulfilled
  test("should return the fulfilled state", () => {
    const state = cartReducer(initialState, fetchUserCart.fulfilled(initialState, "cart/fetchUserCart", 97, "fullfilled"));
    expect(state).toEqual({
      ...initialState,
    });
  })
  // rejected
  test("should have error", () => {
    const error = new Error("error");
    const state = cartReducer(initialState, fetchUserCart.rejected(error, "cart/fetchUserCart", 97, "error"));
    expect(state).toEqual({
      ...initialState,
      error: "error",
      loading: false,
    });
  })
  // pending
  test("should be loading", () => {
    const state = cartReducer(initialState, fetchUserCart.pending("pending", 97));
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  })
});
