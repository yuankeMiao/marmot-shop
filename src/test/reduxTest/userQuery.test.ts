import { createStore } from "../../redux/store";
import { userServer } from "../shared/userServer";
import userApi from "../../redux/slices/userApi";

let store = createStore();

beforeAll(() => {
  userServer.listen();
});

beforeEach(() => {
  store = createStore();
});

afterAll(() => {
  userServer.close();
});

describe("userQuery", () => {
  // correct credentials
  test("login fulfill", async () => {
    let returnedData = await store
      .dispatch(
        userApi.endpoints.login.initiate({
          username: "hbingley1",
          password: "CQutx25i8r",
        })
      )
      .then((result) => {
        if ("data" in result) {
          return result.data;
        }
      });
    expect(returnedData).toHaveProperty("token");
  });

  // wrong credentials
  test("login reject", async () => {
    let returnedData = await store
      .dispatch(
        userApi.endpoints.login.initiate({
          username: "hbingley1",
          password: "wrongCode",
        })
      )
      .then((result) => {
        if ("error" in result) {
          return result.error;
        }
      });
    expect(returnedData).toHaveProperty("status", 404);
  });

  // register a new user
    test("register", async () => {
      let returnedData = await store
        .dispatch(
          userApi.endpoints.register.initiate({
            username: "newUser",
            email: "newUser@gmail.com",
            password: "newUserPassword",
            confirmPassword: "newUserPassword",
            firstName: "new",
            lastName: "user",
            image: "https://randomwimage.com",
            })
        )
        .then((result) => {
          if ("data" in result) {
            return result.data;
          }
        });
        expect(returnedData).toHaveProperty("id");
    });
});

