import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import DisplayProducts from "../../components/produtcs/DisplayProducts";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { productServer } from "../shared/productServer";
import { http, HttpResponse } from "msw";

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

const wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

describe("DisplayProducts component", () => {
  test("hsould render all products from api - fulfilled", async () => {
    render(
      <DisplayProducts
        filter={{
          category: "",
          sortByPrice: "",
        }}
      />,
      { wrapper: wrapper }
    );

    expect(await screen.findAllByText("Add to Bag")).toHaveLength(5);
  });

  test("should render all products from api - loading", async () => {
    render(
      <DisplayProducts
        filter={{
          category: "",
          sortByPrice: "",
        }}
      />,
      { wrapper: wrapper }
    );

    // find screen immediately instead of await
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render all products from api - error", async () => {
    // manually set an error, override the default handler
    productServer.use(
      http.get("https://dummyjson.com/products", () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    render(
      <DisplayProducts
        filter={{
          category: "",
          sortByPrice: "",
        }}
      />,
      { wrapper: wrapper }
    );

    expect(
      await screen.findByText(
        "Something wrong with the data, please refresh the page"
      )
    ).toBeInTheDocument();
  });

  test("should render products from skincare", async () => {
    render(
      <DisplayProducts
        filter={{
          category: "skincare",
          sortByPrice: "",
        }}
      />,
      { wrapper: wrapper }
    );

    expect(await screen.findByText("Hyaluronic Acid Serum")).toBeInTheDocument();
    expect(await screen.findAllByText("Add to Bag")).toHaveLength(1);
  } );
});
