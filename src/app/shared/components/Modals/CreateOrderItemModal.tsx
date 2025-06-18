import { Modal } from 'antd';

type ModalProps = {
  isModalOpen: boolean;
  onOk: (quantity: number) => void;
  onCancel: () => void;
};

export const CreateOrderItemModal = ({ isModalOpen, onCancel, onOk }: ModalProps) => {
  return (
    <Modal
      className='custom-modal'
      title='Create New Order Item'
      open={isModalOpen}
      centered
      onCancel={onCancel}
      destroyOnHidden
      footer={<></>}
    >
      <div className='flex items-center flex-col'></div>
    </Modal>
  );
};
