import { formatVND } from '@/core/helpers/currencyHelper';
import { Badge } from './Badge';

type Order = {
  avatarColor: string;
  name: string;
  orderItemQuantity: number;
  payment: number;
  status: 'available' | 'occupied' | 'reserved';
};

const orders: Order[] = [
  {
    avatarColor: 'bg-orange-400',
    name: 'Table 01',
    orderItemQuantity: 2,
    payment: 250000,
    status: 'available',
  },
  {
    avatarColor: 'bg-orange-400',
    name: 'Table 02',
    orderItemQuantity: 0,
    payment: 0,
    status: 'available',
  },
  {
    avatarColor: 'bg-purple-400',
    name: 'Table 03',
    orderItemQuantity: 0,
    payment: 0,
    status: 'reserved',
  },
  {
    avatarColor: 'bg-purple-400',
    name: 'Table 04',
    orderItemQuantity: 0,
    payment: 0,
    status: 'reserved',
  },
];

const colorMapping = {
  available: 'green',
  occupied: 'orange',
  reserved: 'purple',
} as const;

export const OrderTable = () => {
  return (
    <table className='w-full table-auto text-center text-white'>
      <thead>
        <tr className='border-b border-gray-700'>
          <th className='py-4 text-left'>Table</th>
          <th className='py-4 text-left'>Order Items</th>
          <th className='py-4'>Total Payment</th>
          <th className='py-4'>Status</th>
        </tr>
      </thead>
      <tbody className='overflow-y-auto h-full'>
        {orders.map((order, idx) => (
          <tr key={idx} className='border-b border-gray-800 hover:bg-[#2a2a3a] transition'>
            <td className='py-4'>
              <div className='flex items-center justify-start gap-3'>
                <div className={`w-10 h-10 rounded-full ${order.avatarColor}`} />
                {order.name}
              </div>
            </td>
            <td className='py-4 text-left'>{order.orderItemQuantity}</td>
            <td className='py-4'>{formatVND(order.payment)}</td>
            <td className='py-4'>
              <span className='px-4 py-1 rounded-full text-sm font-medium inline-block'>
                <Badge color={colorMapping[order.status]}>{order.status}</Badge>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
