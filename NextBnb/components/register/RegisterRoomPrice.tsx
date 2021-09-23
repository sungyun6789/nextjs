import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import RegisterRoomFooter from './RegisterRoomFooter';
import palette from '../../styles/palette';
import { useSelector } from '../../store';
import Input from '../common/Input';

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

const RegisterRoomPrice: React.FC = () => {
  const dispatch = useDispatch();

  const price = useSelector((state) => state.registerRoom.price);

  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      <Input label="기본요금" value={String(price)} />
      <RegisterRoomFooter prevHref="/room/register/title" nextHref="/room/register/date" />
    </Container>
  );
};

export default RegisterRoomPrice;
