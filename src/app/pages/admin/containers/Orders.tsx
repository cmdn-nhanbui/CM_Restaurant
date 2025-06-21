import { Pagination, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderItemTable } from '@/shared/components/OrderItemTable';
import { useOrderItemData } from '@/shared/hooks/useOrderItem';

import type { OrderItemRow } from '@/core/constants/types';
import { getCurrentDate } from '@/core/helpers/timeHelper';
import { mapOrderItemRow } from '@/core/mappers/orderItem.mapper';
import { CreateOrderItemModal } from '@/shared/components/Modals/CreateOrderItemModal';
import { getPusher } from '@/shared/hooks/usePusher';
import { PUSHER_CHANEL } from '@/core/constants/pusher';

const Orders = () => {
  const [isShowCreateModal, setIsShowCreateModal] = useState<boolean>(false);
  const handleChangeShowCreate = () => setIsShowCreateModal((prev) => !prev);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  const { data, refetch, isLoading } = useOrderItemData({ page, perPage: 15 });
  const orderItemsData: OrderItemRow[] = data?.docs?.map(mapOrderItemRow);

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(PUSHER_CHANEL);

    channel.bind('NewOrder', () => {
      refetch();
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANEL);
    };
  }, []);

  return (
    <>
      <div className='flex gap-6 flex-col sm:h-full'>
        <div className='w-full overflow-y-hidden flex flex-col'>
          <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
            <h2 className='text-white font-semibold text-3xl'>Orders</h2>
            <p className='text-lg'>{getCurrentDate()}</p>
          </div>
        </div>

        <div>
          <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden flex flex-col'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-white'>Order Report</h2>
              <div className='flex items-center gap-3'>
                <span className='text-white'>Filter by: </span>
                <Select
                  rootClassName='custom-antd-select'
                  defaultValue='created_asc'
                  style={{ width: 120 }}
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
              <OrderItemTable onReload={() => refetch()} data={orderItemsData} isLoading={isLoading} />
            </div>

            <div className='pt-3 border-t border-[var(--dark-line)]'>
              <Pagination
                rootClassName='antd-custom-pagination'
                current={page}
                align='center'
                defaultCurrent={1}
                total={data?.total_docs || 0}
                pageSize={15}
                showSizeChanger={false}
                showLessItems
                onChange={handleChangePage}
              />
            </div>
          </section>
        </div>
      </div>

      <CreateOrderItemModal
        onCancel={handleChangeShowCreate}
        isModalOpen={isShowCreateModal}
        onOk={handleChangeShowCreate}
      />
    </>
  );
};

export default Orders;
