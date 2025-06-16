import { useParams } from 'react-router-dom';

const Categories = () => {
  const { id } = useParams();
  return (
    <>
      <div className='text-white'>Categories: {id}</div>
    </>
  );
};

export default Categories;
