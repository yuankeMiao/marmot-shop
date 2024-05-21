
import { setupServer } from "msw/node";
import { productsHandlers } from "./serverHandlers/productHandlers";
import { categoryHandlers } from "./serverHandlers/categoryHandlers";


export const mockServer = setupServer(...productsHandlers, ...categoryHandlers);
