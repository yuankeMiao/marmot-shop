import { HttpResponse, http } from "msw";
import { BACKEND_URL } from "../../../misc/constants";
import mockProducts from "../mockData/mockPruducts";
import { randomUUID } from "crypto";
import {
  ImageReadDto,
  ProductCreateDto,
  ProductReadDto,
  ProductUpdateDto,
} from "../../../misc/productTypes";

export const productsHandlers = [
  http.get(`${BACKEND_URL}/products`, async ({ request }) => {
    return new HttpResponse(JSON.stringify(mockProducts), {
      status: 200,
      headers: {
        "X-total-count": "15",
      },
    });
  }), 

  http.get(`${BACKEND_URL}/products/:id`, async ({ params }) => {
    const id = params.id;
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(product);
  }),

  // for mutatiosn, the mock server did not really change anything, because I only need the response data to test
  http.post(`${BACKEND_URL}/products`, async ({ request }) => {
    const product = (await request.json()) as ProductCreateDto;
    let productId = randomUUID();
    let newImages: ImageReadDto[] = product.images.map((image) => ({
      id: randomUUID(),
      productId: productId,
      ...image,
    }));

    const newProduct: ProductReadDto = {
      ...product,
      id: productId,
      images: newImages,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.patch(`${BACKEND_URL}/products/:id`, async ({ request, params }) => {
    const updateData = (await request.json()) as ProductUpdateDto;
    const id = params.id;
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return HttpResponse.json(null, { status: 404 });
    const updatedProduct = { ...product, ...updateData, updatedDate: new Date() };
    return HttpResponse.json(updatedProduct, { status: 200 });
  }),

  http.delete(`${BACKEND_URL}/products/:id`, async ({ params }) => {
    const id = params.id;
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(true, { status: 200 });
  }),
];
