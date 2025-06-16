import { Modal } from 'antd';
import { Button } from '../Button';

type ModalProps = {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
  description: string;
};

export const ConfirmModal = ({ isModalOpen, onOk, onCancel, title, description }: ModalProps) => {
  const handleConfirm = () => {
    return onOk();
  };
  return (
    <Modal
      className='custom-modal'
      title={title}
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
        <p className='text-white text-center text-base my-4'>{description}</p>
      </div>
    </Modal>
  );
};
