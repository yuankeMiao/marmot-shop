import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { ProductType } from "../../misc/productTypes";

const mockProducts = {
  products: [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      ],
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
    },
    {
      id: 4,
      title: "Plant Hanger For Home",
      description:
        "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
      price: 41,
      discountPercentage: 17.86,
      rating: 4.08,
      stock: 131,
      brand: "Boho Decor",
      category: "home-decoration",
      thumbnail: "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/26/1.jpg",
        "https://cdn.dummyjson.com/product-images/26/2.jpg",
        "https://cdn.dummyjson.com/product-images/26/3.jpg",
        "https://cdn.dummyjson.com/product-images/26/4.jpg",
        "https://cdn.dummyjson.com/product-images/26/5.jpg",
        "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
      ],
    },
    {
      id: 5,
      title: "Hyaluronic Acid Serum",
      description:
        "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
      price: 19,
      discountPercentage: 13.31,
      rating: 4.83,
      stock: 110,
      brand: "L'Oreal Paris",
      category: "skincare",
      thumbnail: "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/16/1.png",
        "https://cdn.dummyjson.com/product-images/16/2.webp",
        "https://cdn.dummyjson.com/product-images/16/3.jpg",
        "https://cdn.dummyjson.com/product-images/16/4.jpg",
        "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
      ],
    },
  ],
  limits: 5,
};

export const productsHandlers = [
  // Intercept the "GET /resource" request.
  http.get("https://dummyjson.com/products", async ({ request }) => {
    const limit = Number(new URL(request.url).searchParams.get("limit"));
    const limited = mockProducts.products.slice(0, limit);

    return HttpResponse.json({
      ...mockProducts,
      products: limited,
    });
  }),

  http.get("https://dummyjson.com/products/search", async ({ request }) => {
    // console.log("search handler called");
    const search = new URL(request.url).searchParams.get("q");
    // console.log("search", search);
    if (!search || search === "")
      return HttpResponse.json({
        ...mockProducts,
        products: [],
      });
    const results = mockProducts.products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    return HttpResponse.json({
      ...mockProducts,
      products: results,
    });
  }),

  http.get("https://dummyjson.com/products/category/:category", ({ params }) => {
    const { category } = params;
    const limited = mockProducts.products.filter(
      (p) => p.category === category
    );
    return HttpResponse.json({
      ...mockProducts,
      products: limited,
    });
  }),

  http.get("https://dummyjson.com/products/:id", ({ params }) => {
    const id = Number(params.id);
    const product = mockProducts.products.find((p) => p.id === id);
    if (!product) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(product);
  }),


  http.post("https://dummyjson.com/products/add", async ({ request }) => {
    const product = (await request.json()) as ProductType;
    const newProduct: ProductType = {
      ...product,
      id: mockProducts.products.length + 1,
    };
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put(
    "https://dummyjson.com/products/:id",
    async ({ request, params }) => {
      const updateData = (await request.json()) as Partial<ProductType>;
      const id = Number(params.id);
      const product = mockProducts.products.find((p) => p.id === id);
      if (!product) return HttpResponse.json(null, { status: 404 });
      const updatedProduct = { ...product, ...updateData };
      return HttpResponse.json(updatedProduct, { status: 200 });
    }
  ),

  http.delete("https://dummyjson.com/products/:id", async ({ params }) => {
    const id = Number(params.id);
    const product = mockProducts.products.find((p) => p.id === id);
    if (!product) return HttpResponse.json(null, { status: 404 });
    mockProducts.products = mockProducts.products.filter((p) => p.id !== id);
    return HttpResponse.json(
      {
        ...product,
        isDeleted: true,
        DeletedOn: new Date().toISOString(),
      },
      { status: 200 }
    );
  }),
];


export const productServer = setupServer(...productsHandlers);
