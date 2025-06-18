import { Spin } from 'antd';

export const Loading = () => {
  return (
    <div className={`fixed inset-0 z-[1400] bg-white bg-opacity-10 flex items-center justify-center bg-opacity-100`}>
      <Spin size='large' />
    </div>
  );
};
