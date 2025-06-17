import { useState } from 'react';
import { message, Modal, Select, type UploadFile, type UploadProps } from 'antd';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '../../Button';
import { TextField } from '../../TextField';
import { FilePicker } from '../../FilePicker';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';
import { joiResolver } from '@hookform/resolvers/joi';
import addProductSchema from './addProduct.validation';
import { addProduct } from '@/core/services/product.service';

type ModalProps = {
  isModalOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
};

type FormUploadProductProps = {
  productName: string;
  price: number;
  quantity: number;
};

export const AddProductModal = ({ isModalOpen, onCancel, onOk }: ModalProps) => {
  const { data: categoryData } = useSelector((state: RootState) => state.category);
  const [categoryId, setCategoryId] = useState(categoryData?.[0]?.id);

  const [messageApi, contextHolder] = message.useMessage();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUploadProductProps>({
    defaultValues: {
      productName: '',
      price: 0,
      quantity: 0,
    },
    resolver: joiResolver(addProductSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const handleChangePickFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const handleAddProduct: SubmitHandler<FormUploadProductProps> = (data) => {
    if (!fileList?.length) {
      return messageApi.error('File must be attached');
    }

    const { productName, price, quantity } = data;
    const file = fileList?.[0].originFileObj;

    const addProductRequest = async () => {
      const toastKey = 'add_product';

      messageApi.open({
        key: toastKey,
        type: 'loading',
        content: 'Creating...',
      });

      try {
        await addProduct({ productName, price, categoryId, file, quantity });

        messageApi.open({
          key: toastKey,
          type: 'success',
          content: 'Create product successfully',
          duration: 2,
        });

        reset();
        setFileList([]);
        return onOk();
      } catch (error) {
        messageApi.open({
          key: toastKey,
          type: 'error',
          content: 'Create product unsuccessfully',
          duration: 2,
        });

        console.log(error);
      }
    };

    addProductRequest();
  };

  return (
    <>
      {contextHolder}
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
              {errors?.productName && (
                <p className='text-sm px-2 text-[var(--primary)]'>{errors?.productName?.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2 mt-2'>
              <label htmlFor='product-name' className='text-white text-base'>
                Price
              </label>
              <TextField {...register('price')} type='number' id='price' />
              {errors?.price && <p className='text-sm px-2 text-[var(--primary)]'>{errors?.price?.message}</p>}
            </div>
            <div className='flex flex-col gap-2 mt-2'>
              <label htmlFor='product-name' className='text-white text-base'>
                Quantity
              </label>
              <TextField {...register('quantity')} type='number' id='quantity' />
              {errors?.quantity && <p className='text-sm px-2 text-[var(--primary)]'>{errors?.quantity?.message}</p>}
            </div>
            <div className='flex  gap-2 mt-4'>
              <label htmlFor='product-name' className='text-white text-base'>
                Category
              </label>
              <Select
                rootClassName='custom-antd-select'
                defaultValue={categoryId}
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
                  setCategoryId(value);
                }}
                options={categoryData.map((item) => ({ value: item.id, label: item.name }))}
              />
            </div>

            <div className='flex gap-3 justify-end mt-4'>
              <Button outlined key='cancel' onClick={onCancel}>
                Cancel
              </Button>
              <Button key='ok' onClick={handleSubmit(handleAddProduct)}>
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
