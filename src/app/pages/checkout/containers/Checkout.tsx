import { ROUTES } from '@/core/constants/routes';
import { PaymentVerify } from '@/core/services/checkout.service';
import { Loading } from '@/shared/components/Loading';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const vnPayOrderInfo = searchParams.get('vnp_OrderInfo');
    const vnPaySecureHash = searchParams.get('vnp_SecureHash');
    if (vnPayOrderInfo && vnPaySecureHash) {
      // gui request xac nhan
      const paymentParams = location.search;
      PaymentVerify(paymentParams)
        .then(() => navigate(ROUTES.ORDER))
        .catch(() => navigate(ROUTES.ROOT));
    }
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default Checkout;
