import { useEffect, useState } from 'react';
import { Modal, Select, type UploadFile, type UploadProps } from 'antd';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '../Button';
import { TextField } from '../TextField';
import { FilePicker } from '../FilePicker';

type ModalProps = {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
};

type FormUploadProductProps = {
  productName: string;
  price: number;
  categoryId: number;
};

export const AddProductModal = ({ isModalOpen, onOk, onCancel }: ModalProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const imageUrls = ['https://www.justspices.co.uk/media/recipe/Egg-Fried-Noodles_Just-Spices.webp']; // Chọn 1 ảnh hoặc nhiều

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormUploadProductProps>({
    defaultValues: {
      productName: '',
      price: 0,
    },
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const handleChangePickFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const handleAddProduct: SubmitHandler<FormUploadProductProps> = (data) => {
    console.log(data);
  };

  const handleConfirm = () => {
    return onOk();
  };

  useEffect(() => {
    const mapped = imageUrls.map((url, index) => ({
      uid: `-init-${index}`,
      name: `image-${index}.png`,
      status: 'done' as const,
      url,
    }));

    setFileList(mapped);
  }, []);

  return (
    <Modal
      className='custom-modal'
      title='Add New Product'
      open={isModalOpen}
      onCancel={onCancel}
      destroyOnHidden
      footer={<></>}
    >
      <div className='flex flex-col'>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className='flex flex-col gap-2'>
            <FilePicker fileList={fileList} setFileList={setFileList} onChange={handleChangePickFile} />
          </div>

          <div className='flex flex-col gap-2 mt-2'>
            <label htmlFor='product-name' className='text-white text-base'>
              Product Name
            </label>
            <TextField {...register('productName')} id='product-name' />
          </div>
          <div className='flex flex-col gap-2 mt-2'>
            <label htmlFor='product-name' className='text-white text-base'>
              Price
            </label>
            <TextField {...register('price')} type='number' id='price' />
          </div>
          <div className='flex  gap-2 mt-4'>
            <label htmlFor='product-name' className='text-white text-base'>
              Category
            </label>
            <Select
              rootClassName='custom-antd-select'
              defaultValue='lucy'
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
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled' },
              ]}
            />
          </div>

          <div className='flex gap-3 justify-end mt-4'>
            <Button outlined key='cancel' onClick={onCancel}>
              Cancel
            </Button>
            <Button key='ok' onClick={handleConfirm}>
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
