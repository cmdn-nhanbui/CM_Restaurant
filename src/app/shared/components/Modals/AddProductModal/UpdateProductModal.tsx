import { useEffect, useState } from 'react';
import { message, Modal, Select, type UploadFile, type UploadProps } from 'antd';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '../../Button';
import { TextField } from '../../TextField';
import { FilePicker } from '../../FilePicker';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';
import { joiResolver } from '@hookform/resolvers/joi';
import addProductSchema from './addProduct.validation';
import { updteProduct } from '@/core/services/product.service';
import type { Product } from '@/core/constants/types';

interface ModalProps {
  isModalOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
  data: Product | null;
}

interface FormUpdateProductProps {
  productName: string;
  price: number;
  quantity: number;
}

export const UpdateProductModal = ({ isModalOpen, onCancel, onOk, data }: ModalProps) => {
  const { data: categoryData } = useSelector((state: RootState) => state.category);
  const [categoryId, setCategoryId] = useState(categoryData?.[0]?.id);

  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormUpdateProductProps>({
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

  const handleUpdateProduct: SubmitHandler<FormUpdateProductProps> = (formData) => {
    if (!fileList?.length) {
      return messageApi.error('File must be attached');
    }
    const file = fileList?.[0]?.originFileObj;
    const { productName, price, quantity } = formData;

    const updateRequest = async () => {
      const toastKey = 'update_product';

      try {
        if (!data) return;
        messageApi.open({
          key: toastKey,
          type: 'loading',
          content: 'Updating...',
        });

        await updteProduct(data.id, {
          name: productName,
          categoryId: categoryId,
          price: price,
          quantity: quantity,
          image: file,
        });

        messageApi.open({
          key: toastKey,
          type: 'success',
          content: 'Update product successfully',
          duration: 2,
        });

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
    updateRequest();
  };

  useEffect(() => {
    if (data !== null) {
      setCategoryId(data?.category?.id);
      setValue('productName', data.name);
      setValue('price', data.price);
      setValue('quantity', data.quantity);
      if (data?.imageUrl !== null) {
        setFileList([
          {
            uid: `-init-1`,
            name: `image-1.png`,
            status: 'done' as const,
            url: data.imageUrl,
          },
        ]);
      }
    }
  }, [data]);

  return (
    <>
      {contextHolder}
      <Modal
        className='custom-modal'
        title='Update Product'
        open={isModalOpen}
        onCancel={onCancel}
        destroyOnHidden
        footer={<></>}
      >
        <div className='flex flex-col'>
          <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
              <Button key='ok' onClick={handleSubmit(handleUpdateProduct)}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
