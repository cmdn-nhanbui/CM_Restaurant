export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  uuid: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  order: Order;
  tableName: string;
}

export const mapInvoiceData = (data: any): Invoice => {
  return {
    id: data?.id,
    invoiceNumber: data?.invoice_number,
    totalAmount: data?.total_amount,
    status: data?.status,
    createdAt: data?.created_at,
    updatedAt: data?.updated_at,
    tableName: data?.table_name,
    order: {
      uuid: data?.order?.uuid,
      status: data?.order?.status,
      createdAt: data?.order?.created_at,
      updatedAt: data?.order?.updated_at,
      orderItems: data?.order?.order_items.map((item: any) => ({
        productName: item?.product_name,
        quantity: item?.quantity,
        price: item?.price,
        status: item?.status,
        notes: item?.notes,
        createdAt: item?.created_at,
        updatedAt: item?.updated_at,
      })),
    },
  };
};
