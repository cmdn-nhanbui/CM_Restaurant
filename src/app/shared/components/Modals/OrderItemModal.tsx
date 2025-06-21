import { Modal, Select, InputNumber, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { Button } from '../Button';
import type { OrderItemRow, OrderItemStatus } from '@/core/constants/types';
import { formatVND } from '@/core/helpers/currencyHelper';
import { updateOrderItem } from '@/core/services/orderItem.service';

type ModalProps = {
  isModalOpen: boolean;
  onOk?: () => void;
  onCancel: () => void;
  data: OrderItemRow | null;
};

export const OrderItemModal = ({ isModalOpen, onCancel, onOk, data }: ModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<OrderItemStatus>('pending');

  useEffect(() => {
    if (data) {
      setQuantity(data.quantity);
      setNotes(data.notes || '');
      setStatus(data.status);
    }
  }, [data]);

  const handleSubmit = () => {
    const updateRequest = async () => {
      const key = 'updateable';
      messageApi.open({
        type: 'loading',
        content: 'Updating...',
        key,
      });
      try {
        await updateOrderItem({ id: data?.uuid as string, notes, quantity, status });
        messageApi.open({
          type: 'success',
          content: 'Updated order item',
          key,
          duration: 2,
        });
        if (onOk) return onOk();
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: 'Update order item unsuccessfully',
          key,
          duration: 2,
        });
      }
    };

    updateRequest();
  };

  return (
    <>
      {contextHolder}
      <Modal
        className='custom-modal'
        title='Update Order Item'
        open={isModalOpen}
        centered
        onCancel={onCancel}
        destroyOnHidden
        footer={
          <div className='flex justify-end gap-3'>
            <Button outlined onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        }
      >
        {data && (
          <div className='flex flex-col gap-4 text-white'>
            <div>
              <p className='text-sm text-gray-400'>Product Name</p>
              <p className='font-medium'>{data?.name}</p>
            </div>

            <div>
              <p className='text-sm text-gray-400'>Price per item</p>
              <p className='font-medium'>{formatVND(data?.price)}</p>
            </div>

            <div>
              <p className='text-sm text-gray-400 mb-1'>Quantity</p>
              <InputNumber
                style={{
                  backgroundColor: 'var(--form-background)',
                  color: '#fff',
                  borderColor: 'var(--dark-line)',
                }}
                min={1}
                max={100}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                className='w-full'
              />
            </div>

            <div>
              <p className='text-sm text-gray-400 mb-1'>Notes</p>
              <Input.TextArea
                className='custom-textarea'
                styles={{
                  textarea: {
                    backgroundColor: 'var(--form-background)',
                    color: 'white',
                    borderColor: 'var(--dark-line)',
                  },
                }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder='Enter additional notes...'
              />
            </div>

            <div>
              <p className='text-sm text-gray-400 mb-1'>Status</p>

              <Select
                rootClassName='custom-antd-select'
                styles={{
                  popup: {
                    root: {
                      backgroundColor: 'var(--form-background)',
                      color: 'white',
                    },
                  },
                }}
                value={status}
                onChange={(value) => setStatus(value)}
                className='w-full'
                options={[
                  { value: 'pending', label: <span className='text-[var(--orange)]'>Pending</span> },
                  { value: 'preparing', label: <span className='text-[var(--blue)]'>Preparing</span> },
                  { value: 'completed', label: <span className='text-[var(--green)]'>Completed</span> },
                ]}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
