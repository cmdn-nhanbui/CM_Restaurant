import { formatVND } from '@/core/helpers/currencyHelper';
import { Badge, type BadColor } from './Badge';
import { useState } from 'react';
import { OrderItemModal } from './Modals/OrderItemModal';

type OrderStatus = 'pending' | 'preparing' | 'completed';

type Order = {
  id: string;
  table: string;
  name: string;
  quantity: number;
  price: number;
  payment: number;
  status: OrderStatus;
  avatarColor: string;
};

const orders: Order[] = [
  {
    id: 'ORD-001',
    table: 'Table 01',
    name: 'Nguyen Van A',
    quantity: 2,
    price: 125000,
    payment: 250000,
    status: 'pending',
    avatarColor: 'bg-yellow-400',
  },
  {
    id: 'ORD-002',
    table: 'Table 02',
    name: 'Le Thi B',
    quantity: 3,
    price: 85000,
    payment: 255000,
    status: 'preparing',
    avatarColor: 'bg-blue-400',
  },
  {
    id: 'ORD-003',
    table: 'Table 03',
    name: 'Tran Van C',
    quantity: 1,
    price: 150000,
    payment: 150000,
    status: 'completed',
    avatarColor: 'bg-green-400',
  },
  {
    id: 'ORD-004',
    table: 'Table 04',
    name: 'Pham Thi D',
    quantity: 4,
    price: 75000,
    payment: 300000,
    status: 'preparing',
    avatarColor: 'bg-blue-400',
  },
  {
    id: 'ORD-005',
    table: 'Table 05',
    name: 'Hoang Van E',
    quantity: 0,
    price: 0,
    payment: 0,
    status: 'pending',
    avatarColor: 'bg-yellow-400',
  },
];

const colorMapping: Record<OrderStatus, string> = {
  pending: 'orange',
  preparing: 'blue',
  completed: 'green',
};

interface OrderTableProps {
  sort: OrderStatus | 'all';
}

const orderSorting = (orders: Order[], sort: OrderTableProps['sort']) => {
  if (sort === 'all') return orders;
  return orders.filter((order) => order.status === sort);
};

export const OrderItemTable = ({ sort }: OrderTableProps) => {
  const data = orderSorting(orders, sort);

  const [selectedOrderItem, setSelectedOrderItem] = useState<null | any>(null);

  const handleUpdateOrderItem = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <table className='w-full table-auto text-center text-white'>
        <thead>
          <tr className='border-b border-gray-700'>
            <th className='py-4 text-left'>Order Item Id</th>
            <th className='py-4 text-left'>Table</th>
            <th className='py-4 text-left'>Name</th>
            <th className='py-4 text-left'>Quantity</th>
            <th className='py-4 text-left'>Price</th>
            <th className='py-4 text-left'>Total Payment</th>
            <th className='py-4'>Status</th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto h-full'>
          {data.map((order) => (
            <tr
              onClick={() => setSelectedOrderItem(order)}
              key={order.id}
              className='border-b border-gray-800 hover:bg-[#2a2a3a] transition'
            >
              <td className='py-4'>
                <div className='flex items-center justify-start gap-3'>
                  <div className={`w-10 h-10 rounded-full ${order.avatarColor}`} />
                  {order.id}
                </div>
              </td>
              <td className='py-4 text-left'>{order.table}</td>
              <td className='py-4 text-left'>{order.name}</td>
              <td className='py-4 text-left'>{order.quantity}</td>
              <td className='py-4 text-left'>{formatVND(order.price)}</td>
              <td className='py-4 text-left'>{formatVND(order.payment)}</td>
              <td className='py-4'>
                <Badge color={colorMapping[order.status] as BadColor}>{order.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderItemModal
        onCancel={() => setSelectedOrderItem(null)}
        onOk={handleUpdateOrderItem}
        isModalOpen={selectedOrderItem !== null}
        orderItem={{
          uuid: '24f499bd-855e-40ee-b8b3-16ba38e5b1ff',
          quantity: 1,
          notes: '',
          price: 25000,
          status: 'pending',
          product: {
            id: 1,
            name: 'Xien bo nuong',
            price: 25000,
          },
        }}
      />
    </>
  );
};
