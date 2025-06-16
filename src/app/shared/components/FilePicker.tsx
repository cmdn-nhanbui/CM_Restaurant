import { useState } from 'react';
import { Image, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';

import '@ant-design/v5-patch-for-react-19';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FilePickerProps = {
  fileList: UploadFile[];
  onChange: UploadProps['onChange'];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const FilePicker = ({ fileList, onChange, setFileList }: FilePickerProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const beforeUpload = async (file: FileType) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ được chọn ảnh!');
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
      return false;
    }

    const preview = await getBase64(file);
    const newFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'done',
      url: preview,
      originFileObj: file,
    };

    setFileList([newFile]); // Chỉ giữ một ảnh duy nhất
    return false; // Ngăn upload thật
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
        beforeUpload={beforeUpload}
        showUploadList
        maxCount={1}
        rootClassName='custom-file-picker'
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
