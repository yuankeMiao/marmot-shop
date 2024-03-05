import { createStore } from "../../redux/store";
import { userServer } from "../shared/userServer";
import currentUserReducer, {fetchCurrentUser, logout} from "../../redux/slices/currentUserSlice"; 
import { CurrentUserStateType } from "../../misc/userTypes";

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

const initialState: CurrentUserStateType = {
    user: null,
    isLoading: false,
    error: null,
  };

describe("currentUserSlice", () => {

  test("fetchCurrentUser token is expired", async () => {
    await store.dispatch(fetchCurrentUser("expiredToken"));
    expect(store.getState().currentUser.user).toBeNull();
  });


  test("logout", () => {
    store.dispatch(logout());
    expect(store.getState().currentUser.user).toBeNull();
  });
});
