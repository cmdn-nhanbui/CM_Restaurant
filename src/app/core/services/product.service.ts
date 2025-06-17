import request from './api.service';

interface AddProductPayload {
  productName: string;
  price: number;
  quantity?: number;
  file?: File | null;
  categoryId: string | number;
}

interface ProductResponse {
  id: string | number;
  name: string;
  price: number;
  category_id: string | number;
}
export const addProduct = async ({
  productName,
  price,
  quantity,
  file,
  categoryId,
}: AddProductPayload): Promise<ProductResponse> => {
  const formData = new FormData();

  formData.append('name', productName);
  formData.append('price', price.toString());
  formData.append('category_id', categoryId.toString());

  if (quantity) {
    formData.append('quantity', quantity.toString());
  }

  if (file) {
    formData.append('image', file);
  }

  const response = await request.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
  return response?.data;
};

export const searchProduct = async (query: string, page: number) => {
  const response = await request.get(`/products/search?name=${query}&page=${page}&per_page=10`);
  return response?.data;
};

interface GetProductSchema {
  page: number;
  perPage: number;
  sort?: string;
}

export const getProducts = async ({ page, perPage, sort }: GetProductSchema) => {
  const response = await request.get(`/products?page=${page}&per_page=${perPage}&sort=${sort}`);
  return response?.data;
};

interface GetProductByCategorySchema {
  page: number;
  perPage: number;
  sort?: string;
  categoryId: number;
}

export const getProductsByCategoryId = async ({ page, perPage, sort, categoryId }: GetProductByCategorySchema) => {
  const response = await request.get(`/products/category/${categoryId}`, {
    params: {
      page: page,
      per_page: perPage,
      sort: sort,
    },
  });

  return response?.data;
};

export const deleteProduct = async (id: number) => {
  const response = await request.delete(`/products/${id}`);
  return response?.data;
};

export interface FormUpdateProduct {
  name: string;
  price: number;
  categoryId: number;
  quantity: number;
  image?: File;
}

export const updteProduct = async (id: number, data: FormUpdateProduct) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('price', data.price.toString());
  formData.append('category_id', data.categoryId.toString());

  formData.append('quantity', data.quantity != null ? data.quantity.toString() : '');

  if (data.image) {
    formData.append('image', data.image);
  }

  const response = await request.post(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
  return response?.data;
};
