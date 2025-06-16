import { Modal } from 'antd';
import { Button } from '../Button';
import { Counter } from '../Counter';
import { useState } from 'react';

type ModalProps = {
  isModalOpen: boolean;
  onOk: (quantity: number) => void;
  onCancel: () => void;
  imageUrl: string;
};

export const AddToCartModal = ({ isModalOpen, onOk, onCancel, imageUrl }: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleConfirm = () => {
    return onOk(quantity);
  };
  return (
    <Modal
      className='custom-modal'
      title='Add to Cart'
      open={isModalOpen}
      onCancel={onCancel}
      destroyOnHidden
      footer={
        <div className='flex gap-3 justify-end'>
          <Button outlined key='cancel' onClick={onCancel}>
            Cancel
          </Button>
          <Button key='ok' onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      }
    >
      <div className='flex items-center flex-col'>
        <img
          src={imageUrl}
          alt={'product-name'}
          className='w-[120px] h-[120px] object-cover rounded-full mx-auto  border-1 border-[var(--dark-line)] shadow-primary'
        />
        <p className='text-white text-center text-lg my-4'>Please select the Quantity you want to add.</p>
        <div className='mb-4'>
          <Counter onChange={(value) => setQuantity(value)} value={quantity} min={1} max={10} />
        </div>
      </div>
    </Modal>
  );
};
