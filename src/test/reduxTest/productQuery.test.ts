// import { ProductType, ProductQueryType, ProductsState } from "../../misc/productTypes";
// import productQueries, {useGetAllProductsQuery} from "../../redux/slices/productQuery";

// const initialState: ProductsState = {
//     products: [],
//     loading: false,
//     error: null
// };

// describe("Product RTK Query",() => {
//     let mockProducts: ProductQueryType = {
//         "products": [
//           {
//             "id": 1,
//             "title": "iPhone 9",
//             "description": "An apple mobile which is nothing like apple",
//             "price": 549,
//             "discountPercentage": 12.96,
//             "rating": 4.69,
//             "stock": 94,
//             "brand": "Apple",
//             "category": "smartphones",
//             "thumbnail": "...",
//             "images": ["...", "...", "..."]
//           },
//           {
//             "id": 2,
//             "title": "iPhone X",
//             "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//             "price": 899,
//             "discountPercentage": 17.94,
//             "rating": 4.44,
//             "stock": 34,
//             "brand": "Apple",
//             "category": "smartphones",
//             "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
//             "images": [
//             "https://cdn.dummyjson.com/product-images/2/1.jpg",
//             "https://cdn.dummyjson.com/product-images/2/2.jpg",
//             "https://cdn.dummyjson.com/product-images/2/3.jpg",
//             "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
//             ]
//             }
//         ],
      
//         "total": 100,
//         "skip": 0,
//         "limit": 30
//       }

//       // test 1: fullfilled
//       test("should return all products", () => {
//         const {data} = useGetAllProductsQuery();
//         expect(data).toEqual(mockProducts.products);
//         });
// })

export {}