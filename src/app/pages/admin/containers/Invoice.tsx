import { getCurrentDate } from '@/core/helpers/timeHelper';
import { mapInvoiceData } from '@/core/mappers/invoice.mapper';
import { InvoiceTable } from '@/shared/components/InvoiceTable';
import { useGetInvoiceData } from '@/shared/hooks/useInvoice';
import { Pagination, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  const { data } = useGetInvoiceData(page, 15);
  const invoices = data?.docs?.map(mapInvoiceData);

  return (
    <div className='flex gap-6 flex-col sm:h-full'>
      <div className='w-full overflow-y-hidden flex flex-col'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Invoice</h2>
          <p className='text-lg'>{getCurrentDate()}</p>
        </div>
      </div>

      <div className='h-full'>
        <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden flex flex-col h-full'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-white'>Invoice Report</h2>
            <div className='flex items-center gap-3'>
              <span className='text-white'>Filter by: </span>
              <Select
                rootClassName='custom-antd-select'
                defaultValue='created_asc'
                style={{ width: 150 }}
                styles={{
                  popup: {
                    root: {
                      backgroundColor: 'var(--form-background)',
                      color: 'white',
                    },
                  },
                }}
                onChange={(value) => {
                  console.log(value);
                }}
                options={[
                  { value: 'created_asc', label: 'Created ASC' },
                  { value: 'created_desc', label: 'Created DESC' },
                  { value: 'order_asc', label: 'Order ASC' },
                  { value: 'order_desc', label: 'Order DESC' },
                ]}
              />
            </div>
          </div>

          {/* -----Table Data-----  */}
          <div className='mt-2 h-full overflow-y-auto pb-4'>
            <InvoiceTable data={invoices} />
          </div>

          <div className='pt-3 border-t border-[var(--dark-line)]'>
            <Pagination
              rootClassName='antd-custom-pagination'
              current={page}
              align='center'
              defaultCurrent={1}
              total={10}
              pageSize={15}
              showSizeChanger={false}
              showLessItems
              onChange={handleChangePage}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Invoice;
