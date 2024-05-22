import { HttpResponse, http } from "msw";
import { v4 as uuidv4 } from 'uuid';
import { BACKEND_URL } from "../../../misc/constants";
import mockCategories from "../mockData/mockCategories";
import {
  CategoryCreateDto,
  CategoryReadDto,
  CategoryUpdateDto,
} from "../../../misc/categoryTypes";


export const categoryHandlers = [
  http.get(`${BACKEND_URL}/categories`, async () => {
    return HttpResponse.json(mockCategories, { status: 200 });
  }),

  http.get(`${BACKEND_URL}/categories/:id`, async ({ params }) => {
    const id = params.id;
    const category = mockCategories.find((c) => c.id === id);
    if (!category) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(category);
  }),

  http.post(`${BACKEND_URL}/categories`, async ({ request }) => {
    const category = (await request.json()) as CategoryCreateDto;
    const newCategory: CategoryReadDto = {
      ...category,
      id: uuidv4(),
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    return HttpResponse.json(newCategory, { status: 200 });
  }),

  http.patch(`${BACKEND_URL}/categories/:id`, async ({ request, params }) => {
    const updatedData = (await request.json()) as CategoryUpdateDto;
    const id = params.id;
    const category = mockCategories.find((c) => c.id === id);
    if (!category) return HttpResponse.json(null, { status: 404 });
    const updatedCategory = {
      ...category,
      ...updatedData,
      updatedDate: new Date(),
    };
    return HttpResponse.json(updatedCategory, { status: 200 });
  }),

  http.delete(`${BACKEND_URL}/categories/:id`, async ({ params }) => {
    const id = params.id;
    const category = mockCategories.find((c) => c.id === id);
    if (!category) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(true, { status: 200 });
  }),
];
