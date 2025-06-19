import { useEffect, useState } from 'react';
import { Empty, message, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem } from '@/shared/components/CartItem';
import { Button } from '@/shared/components/Button';
import { type AppDispatch, type RootState } from '@src/redux/store';
import { formatVND } from '@/core/helpers/currencyHelper';
import { ConfirmModal } from '@/shared/components/Modals/ConfirmModal';
import type { OrderItemPayload } from '@/core/constants/types';
import { createOrder } from '@/core/services/order.service';
import { clearCartData } from '@src/redux/actions/cartActions';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { data } = useSelector((state: RootState) => state.cart);
  const { data: currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const [selectedTableId, setSelectedTableId] = useState<string>('');

  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  const [creating, setIsCreating] = useState<boolean>(false);

  const handleOrder = () => {
    if (!tableId) {
      setIsShowConfirmModal(false);
      return messageApi.open({
        type: 'error',
        content: 'Not found table id',
        duration: 2,
      });
    }
    const orderRequest = async () => {
      if (creating) return;

      const payload: OrderItemPayload[] = data?.map((item) => ({
        notes: item?.note,
        product_id: item.id,
        quantity: item.quantity,
      }));

      const key = 'updatable';
      setIsCreating(true);
      messageApi.open({
        key,
        type: 'loading',
        content: 'Processing...',
      });

      try {
        await createOrder({ tableId: tableId, orderItems: payload });

        messageApi.open({
          key,
          type: 'success',
          content: 'Order successfully',
          duration: 2,
        });
        dispatch(clearCartData());
        setIsShowConfirmModal(false);
      } catch (error: unknown) {
        let errorMessage = 'Order unsuccessfully';

        if (axios.isAxiosError(error) && error.response?.data?.message) {
          errorMessage = error.response.data.message;
          const status = error.status;
          if (status === 422) errorMessage = 'Table id is not valid';
        }

        messageApi.open({
          key,
          type: 'error',
          content: errorMessage || 'Order unsuccessfully',
          duration: 2,
        });
      } finally {
        setIsCreating(false);
      }
    };

    orderRequest();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total = data?.reduce((prev, current) => prev + current.price * current.quantity, 0);

  return (
    <>
      {contextHolder}
      <div className='flex flex-col h-full justify-between'>
        {/* Header */}
        <div>
          <h2 className='text-lg text-white font-semibold'>Orders #34562</h2>
          <div className='sm:py-6 py-4 flex justify-between text-white text-lg font-semibold border-b border-[var(--dark-line)]'>
            <span>Item/Qty</span>
            <div className='flex'>
              <span className='mr-2'>Price</span>
            </div>
          </div>
        </div>

        {/* Scrollable list */}
        <ul className='flex-1 overflow-y-auto  scrollbar-hidden sm:py-6 py-4 flex flex-col sm:gap-6 gap-4'>
          {data?.map((item, index) => (
            <li key={index}>
              <CartItem
                id={item?.id}
                imageUrl={item?.imageUrl}
                name={item?.name}
                price={item?.price}
                quantity={item?.quantity}
                note={item?.note}
              />
            </li>
          ))}

          {data?.length === 0 && (
            <Empty styles={{ description: { color: 'white', fontSize: 16 } }} description='Cart is empty' />
          )}
        </ul>

        {/* Footer */}
        <div className='flex flex-col'>
          <div className='border-b border-[var(--dark-line)] mb-4'></div>
          {currentUser && (
            <div className='flex justify-between items-center'>
              <label className='text-sm text-white font-semibold'>Select Table</label>
              <Select
                rootClassName='custom-antd-select'
                defaultValue='9b9857d5-abf1-47cc-965b-2965a8779610'
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
                  setSelectedTableId(value);
                }}
                options={[
                  { value: '9b9857d5-abf1-47cc-965b-2965a8779610', label: 'Table 01' },
                  { value: '0d524f1a-3118-4ba0-b8d6-f693862cc3dc', label: 'Table 02' },
                ]}
              />
            </div>
          )}

          <div className='flex items-center justify-between my-4'>
            <span className='text-[var(--text-light)]'>Subtotal</span>
            <span className='text-white'>{formatVND(total)}</span>
          </div>
          {!!data?.length && <Button onClick={() => setIsShowConfirmModal(true)}>Confirm Order</Button>}
        </div>
      </div>
      <ConfirmModal
        isModalOpen={isShowConfirmModal}
        onCancel={() => setIsShowConfirmModal(false)}
        title='Confirm Order'
        description='Do you want to order the products in the cart?'
        onOk={handleOrder}
      />
    </>
  );
};

export default Cart;
