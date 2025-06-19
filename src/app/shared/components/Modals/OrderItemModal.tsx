import { Modal, Select, InputNumber, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Button } from '../Button';

type OrderItemStatus = 'pending' | 'preparing' | 'completed';

type Product = {
  id: number;
  name: string;
  price: number;
};

type OrderItem = {
  uuid: string;
  product: Product;
  quantity: number;
  price: number;
  status: OrderItemStatus;
  notes: string | null;
};

type ModalProps = {
  isModalOpen: boolean;
  onOk: (updated: { quantity: number; notes: string; status: OrderItemStatus }) => void;
  onCancel: () => void;
  orderItem: OrderItem | null;
};

export const OrderItemModal = ({ isModalOpen, onCancel, onOk, orderItem }: ModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<OrderItemStatus>('pending');

  useEffect(() => {
    if (orderItem) {
      setQuantity(orderItem.quantity);
      setNotes(orderItem.notes || '');
      setStatus(orderItem.status);
    }
  }, [orderItem]);

  const handleSubmit = () => {
    onOk({
      quantity,
      notes,
      status,
    });
  };

  return (
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
      {orderItem && (
        <div className='flex flex-col gap-4 text-white'>
          <div>
            <p className='text-sm text-gray-400'>Product Name</p>
            <p className='font-medium'>{orderItem.product.name}</p>
          </div>

          <div>
            <p className='text-sm text-gray-400'>Price per item</p>
            <p className='font-medium'>{orderItem.price} VND</p>
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
                { label: 'Pending', value: 'pending' },
                { label: 'Preparing', value: 'preparing' },
                { label: 'Completed', value: 'completed' },
              ]}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
