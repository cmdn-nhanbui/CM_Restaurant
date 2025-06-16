import { Badge } from './Badge';

type Order = {
  avatarColor: string;
  name: string;
  menu: string;
  payment: string;
  status: 'Completed' | 'Preparing' | 'Pending';
};

const orders: Order[] = [
  {
    avatarColor: 'bg-orange-400',
    name: 'Eren Jaegar',
    menu: 'Spicy seasoned seafood noodles',
    payment: '$125',
    status: 'Completed',
  },
  {
    avatarColor: 'bg-blue-400',
    name: 'Reiner Braunn',
    menu: 'Salted Pasta with mushroom sauce',
    payment: '$145',
    status: 'Preparing',
  },
  {
    avatarColor: 'bg-pink-400',
    name: 'Levi Ackerman',
    menu: 'Beef dumpling in hot and sour soup',
    payment: '$105',
    status: 'Pending',
  },
  {
    avatarColor: 'bg-green-400',
    name: 'Historia Reiss',
    menu: 'Hot spicy fried rice with omelet',
    payment: '$45',
    status: 'Completed',
  },
  {
    avatarColor: 'bg-sky-400',
    name: 'Hanji Zoe',
    menu: 'Hot spicy fried rice with omelet',
    payment: '$245',
    status: 'Completed',
  },
  {
    avatarColor: 'bg-purple-400',
    name: 'Armin Arlert',
    menu: 'Hot spicy fried rice with omelet',
    payment: '$435',
    status: 'Completed',
  },
  {
    avatarColor: 'bg-purple-400',
    name: 'Armin Arlert',
    menu: 'Hot spicy fried rice with omelet',
    payment: '$435',
    status: 'Completed',
  },
];

const colorMapping = {
  Completed: 'green',
  Pending: 'orange',
  Preparing: 'purple',
} as const;

export const OrderTable = () => {
  return (
    <table className='w-full table-auto text-center text-white'>
      <thead>
        <tr className='border-b border-gray-700'>
          <th className='py-4 text-left'>Customer</th>
          <th className='py-4 text-left'>Menu</th>
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
            <td className='py-4 text-left'>{order.menu}</td>
            <td className='py-4'>{order.payment}</td>
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
