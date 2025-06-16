import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type SinnerProps = {
  color?: string;
};
export const Spinner = ({ color = 'white' }: SinnerProps) => {
  return <Spin indicator={<LoadingOutlined spin style={{ color }} />} />;
};
