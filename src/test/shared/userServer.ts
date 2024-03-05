import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { LoginType, UserType } from "../../misc/userTypes";
import { DUMMYJSON_URL } from "../../misc/constants";

// i just copy the data from the api i'm using
const mockUsers = [
  {
    id: 1,
    firstName: "Terry",
    lastName: "Medhurst",
    email: "atuny0@sohu.com",
    username: "atuny0",
    password: "9uQFF1Lh",
    image: "https://robohash.org/Terry.png?set=set4",
    address: {
      address: "1745 T Street Southeast",
      city: "Washington",
      coordinates: {
        lat: 38.867033,
        lng: -76.979235,
      },
      postalCode: "20020",
      state: "DC",
    },
  },
  {
    id: 2,
    firstName: "Sheldon",
    lastName: "Quigley",
    email: "hbingley1@plala.or.jp",
    username: "hbingley1",
    password: "CQutx25i8r",
    image: "https://robohash.org/Sheldon.png?set=set4",
    address: {
      address: "6007 Applegate Lane",
      city: "Louisville",
      coordinates: {
        lat: 38.1343013,
        lng: -85.6498512,
      },
      postalCode: "40219",
      state: "KY",
    },
  },
  {
    id: 3,
    firstName: "Terrill",
    lastName: "Hills",
    email: "rshawe2@51.la",
    username: "rshawe2",
    password: "OWsTbMUgFc",
    image: "https://robohash.org/Terrill.png?set=set4",
    address: {
      address: "560 Penstock Drive",
      city: "Grass Valley",
      coordinates: {
        lat: 39.213076,
        lng: -121.077583,
      },
      postalCode: "95945",
      state: "CA",
    },
  },
];

export const handlers = [
  // should receive a request bearing token and return the user info
  http.get(DUMMYJSON_URL + "/auth/me", async ({ request }) => {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (token === "validToken") {
      const user = mockUsers.find((user) => user.id === 1);
      if (user) {
        return HttpResponse.json(user, { status: 200 });
      }
    } else if (token === "expiredToken") {
      return HttpResponse.json(null, { status: 401 });
    } else return HttpResponse.json(null, { status: 404 });
  }),

  // should receive a request of username and password, and return an object of user info includes token
  http.post(DUMMYJSON_URL + "/auth/login", async ({ request }) => {
    const { username, password } = (await request.json()) as LoginType;
    // console.log(username, password);
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      // console.log("user found");
      return HttpResponse.json(
        { ...user, token: "fakeToken" },
        { status: 200 }
      );
    } else return HttpResponse.json(null, { status: 404 });
  }),

  // register a new user, receive a user object and return the same object with an id
  http.post(DUMMYJSON_URL + "/users/add", async ({ request }) => {
    const newUser = (await request.json()) as Omit<UserType, "id">;
    return HttpResponse.json({ ...newUser, id: 4 }, { status: 200 });
  }),
];

export const userServer = setupServer(...handlers);
