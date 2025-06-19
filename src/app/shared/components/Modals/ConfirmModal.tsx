import { Modal } from 'antd';
import { Button } from '../Button';

type ModalProps = {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  contentConfirmButton?: string;
};

export const ConfirmModal = ({
  isModalOpen,
  onOk,
  onCancel,
  title,
  description,
  contentConfirmButton = 'Confirm',
}: ModalProps) => {
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
      centered
      footer={
        <div className='flex gap-3 justify-end'>
          <Button outlined key='cancel' onClick={onCancel}>
            Cancel
          </Button>
          <Button key='ok' onClick={handleConfirm}>
            {contentConfirmButton}
          </Button>
        </div>
      }
    >
      <div className='flex items-start flex-col'>
        <p className='text-white text-base my-4 text-left'>{description}</p>
      </div>
    </Modal>
  );
};
