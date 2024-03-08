import React, { useEffect } from 'react';
import Button from './Button';
import axios from 'axios';

const Payment = ({price}) => {
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp46657466');

    IMP.request_pay(
      {
        pg: 'kcp.AO09C',
        pay_method: 'card',
        merchant_uid: 'ORD20180131-0000011',
        name: 'Blakbox',
        amount: price,
        buyer_email: 'sunyoungah69@gmail.com',
        buyer_name: '포트원 기술지원팀',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        display: {
          card_quota: [3], // 할부개월 3개월까지 활성화
        },
      },
      async (rsp) => {
        try {
          const { data } = await axios({
            url: '/pay/complete',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            },
          });
          if (rsp.paid_amount === data.response.amount) {
            alert('결제 성공');
          } else {
            alert('결제 실패');
          }
        } catch (error) {
          console.error('Error while verifying payment:', error);
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <>
      <Button text="주문하기" onClick={requestPay}/>
    </>
  );
};

export default Payment;
