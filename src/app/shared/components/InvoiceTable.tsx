import type { Invoice } from '@/core/mappers/invoice.mapper';
import { Badge } from './Badge';
import { formatVND } from '@/core/helpers/currencyHelper';
import { formatTimestamp } from '@/core/helpers/timeHelper';

interface InvoiceTableProps {
  data: Invoice[];
}
export const InvoiceTable = ({ data }: InvoiceTableProps) => {
  return (
    <>
      <table className='w-full table-auto text-center text-white'>
        <thead>
          <tr className='border-b border-gray-700'>
            <th className='py-4 text-left pl-4'>Invoice ID</th>
            <th className='py-4 text-left'>Position</th>
            <th className='py-4 text-left'>Order Items</th>
            <th className='py-4 text-right'>Paid At</th>
            <th className='py-4 text-right'>Total Payment</th>
            <th className='py-4'>Status</th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto h-full'>
          {data?.map((item, index) => (
            <tr key={index} className='border-b border-gray-800 hover:bg-[#2a2a3a] transition'>
              <td className='py-4 text-left pl-4'>{item?.invoiceNumber}</td>
              <td className='py-4 text-left'>{item?.tableName}</td>
              <td className='py-4 text-left'>
                <ul>
                  {item.order.orderItems.map((orderItem, index) => (
                    <li key={index}>
                      {index + 1}. {orderItem.productName}: {formatVND(orderItem.price)} x{orderItem.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className='py-4 text-right'>{formatTimestamp(item.createdAt)}</td>
              <td className='py-4 text-right font-semibold'>{formatVND(item.totalAmount)}</td>
              <td className='py-4'>
                <Badge color='green'>Paid</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
