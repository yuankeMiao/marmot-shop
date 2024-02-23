import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockCart = [
    {
        "id": 1,
        "products": [
        {
        "id": 59,
        "title": "Spring and summershoes",
        "price": 20,
        "quantity": 3,
        "total": 60,
        "discountPercentage": 8.71,
        "discountedPrice": 55,
        "thumbnail": "https://cdn.dummyjson.com/product-images/59/thumbnail.jpg"
        },
        {
        "id": 88,
        "title": "TC Reusable Silicone Magic Washing Gloves",
        "price": 29,
        "quantity": 2,
        "total": 58,
        "discountPercentage": 3.19,
        "discountedPrice": 56,
        "thumbnail": "https://cdn.dummyjson.com/product-images/88/thumbnail.jpg"
        },
        {
        "id": 18,
        "title": "Oil Free Moisturizer 100ml",
        "price": 40,
        "quantity": 2,
        "total": 80,
        "discountPercentage": 13.1,
        "discountedPrice": 70,
        "thumbnail": "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg"
        },
        {
        "id": 95,
        "title": "Wholesale cargo lashing Belt",
        "price": 930,
        "quantity": 1,
        "total": 930,
        "discountPercentage": 17.67,
        "discountedPrice": 766,
        "thumbnail": "https://cdn.dummyjson.com/product-images/95/thumbnail.jpg"
        },
        {
        "id": 39,
        "title": "Women Sweaters Wool",
        "price": 600,
        "quantity": 2,
        "total": 1200,
        "discountPercentage": 17.2,
        "discountedPrice": 994,
        "thumbnail": "https://cdn.dummyjson.com/product-images/39/thumbnail.jpg"
        }
        ],
        "total": 2328,
        "discountedTotal": 1941,
        "userId": 97,
        "totalProducts": 5,
        "totalQuantity": 10
        },

        {
        "id": 2,
        "products": [
        {
        "id": 96,
        "title": "lighting ceiling kitchen",
        "price": 30,
        "quantity": 2,
        "total": 60,
        "discountPercentage": 14.89,
        "discountedPrice": 51,
        "thumbnail": "https://cdn.dummyjson.com/product-images/96/thumbnail.jpg"
        },
        {
        "id": 91,
        "title": "Black Motorbike",
        "price": 569,
        "quantity": 3,
        "total": 1707,
        "discountPercentage": 13.63,
        "discountedPrice": 1474,
        "thumbnail": "https://cdn.dummyjson.com/product-images/91/thumbnail.jpg"
        },
        {
        "id": 9,
        "title": "Infinix INBOOK",
        "price": 1099,
        "quantity": 1,
        "total": 1099,
        "discountPercentage": 11.83,
        "discountedPrice": 969,
        "thumbnail": "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg"
        },
        {
        "id": 16,
        "title": "Hyaluronic Acid Serum",
        "price": 19,
        "quantity": 1,
        "total": 19,
        "discountPercentage": 13.31,
        "discountedPrice": 16,
        "thumbnail": "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg"
        },
        {
        "id": 54,
        "title": "Pubg Printed Graphic T-Shirt",
        "price": 46,
        "quantity": 3,
        "total": 138,
        "discountPercentage": 16.44,
        "discountedPrice": 115,
        "thumbnail": "https://cdn.dummyjson.com/product-images/54/thumbnail.jpg"
        }
        ],
        "total": 3023,
        "discountedTotal": 2625,
        "userId": 30,
        "totalProducts": 5,
        "totalQuantity": 10
        },

        {
        "id": 3,
        "products": [
        {
        "id": 37,
        "title": "ank Tops for Womens/Girls",
        "price": 50,
        "quantity": 2,
        "total": 100,
        "discountPercentage": 12.05,
        "discountedPrice": 88,
        "thumbnail": "https://cdn.dummyjson.com/product-images/37/thumbnail.jpg"
        },
        {
        "id": 80,
        "title": "Chain Pin Tassel Earrings",
        "price": 45,
        "quantity": 3,
        "total": 135,
        "discountPercentage": 17.75,
        "discountedPrice": 111,
        "thumbnail": "https://cdn.dummyjson.com/product-images/80/thumbnail.jpg"
        },
        {
        "id": 68,
        "title": "Stylish Luxury Digital Watch",
        "price": 57,
        "quantity": 3,
        "total": 171,
        "discountPercentage": 9.03,
        "discountedPrice": 156,
        "thumbnail": "https://cdn.dummyjson.com/product-images/68/thumbnail.webp"
        },
        {
        "id": 81,
        "title": "Round Silver Frame Sun Glasses",
        "price": 19,
        "quantity": 1,
        "total": 19,
        "discountPercentage": 10.1,
        "discountedPrice": 17,
        "thumbnail": "https://cdn.dummyjson.com/product-images/81/thumbnail.jpg"
        },
        {
        "id": 90,
        "title": "Cycle Bike Glow",
        "price": 35,
        "quantity": 1,
        "total": 35,
        "discountPercentage": 11.08,
        "discountedPrice": 31,
        "thumbnail": "https://cdn.dummyjson.com/product-images/90/thumbnail.jpg"
        }
        ],
        "total": 460,
        "discountedTotal": 403,
        "userId": 63,
        "totalProducts": 5,
        "totalQuantity": 10
        },

        {
        "id": 4,
        "products": [
        {
        "id": 36,
        "title": "Sleeve Shirt Womens",
        "price": 90,
        "quantity": 1,
        "total": 90,
        "discountPercentage": 10.89,
        "discountedPrice": 80,
        "thumbnail": "https://cdn.dummyjson.com/product-images/36/thumbnail.jpg"
        },
        {
        "id": 54,
        "title": "Pubg Printed Graphic T-Shirt",
        "price": 46,
        "quantity": 1,
        "total": 46,
        "discountPercentage": 16.44,
        "discountedPrice": 38,
        "thumbnail": "https://cdn.dummyjson.com/product-images/54/thumbnail.jpg"
        },
        {
        "id": 11,
        "title": "perfume Oil",
        "price": 13,
        "quantity": 3,
        "total": 39,
        "discountPercentage": 8.4,
        "discountedPrice": 36,
        "thumbnail": "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg"
        },
        {
        "id": 47,
        "title": "Sneaker shoes",
        "price": 120,
        "quantity": 2,
        "total": 240,
        "discountPercentage": 10.37,
        "discountedPrice": 215,
        "thumbnail": "https://cdn.dummyjson.com/product-images/47/thumbnail.jpeg"
        },
        {
        "id": 64,
        "title": "Leather Strap Skeleton Watch",
        "price": 46,
        "quantity": 3,
        "total": 138,
        "discountPercentage": 10.2,
        "discountedPrice": 124,
        "thumbnail": "https://cdn.dummyjson.com/product-images/64/thumbnail.jpg"
        }
        ],
        "total": 553,
        "discountedTotal": 493,
        "userId": 83,
        "totalProducts": 5,
        "totalQuantity": 10
        },
]


const handlers = [

    // for fetchUserCart (userId: number) => Promise<UserCartType>
    // server should return <CartQueryType>
    http.get("https://dummyjson.com/carts/user/:userId", ({params}) => {
        const userId = Number(params.userId);
        const userCart = mockCart.find((cart) => cart.userId === userId);
        return HttpResponse.json({
            carts: [userCart],
            total: 1,
            skip: 0,
            limit: 1
        });
    }),
]

export const cartServer =  setupServer(...handlers);