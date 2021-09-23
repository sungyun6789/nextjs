import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import DatePicker from '../../common/DatePicker';

const Container = styled.div`
  padding: 62px 30px 100px;
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

const RegisterRoomDate: React.FC = () => {
  const dispatch = useDispatch();

  const startDate = useSelector((state) => state.registerRoom.startDate);

  // 예약 시작 날짜 변경 시
  const onChangeStartDate = (date: Date | null) => {
    console.log(date);
    dispatch(registerRoomActions.setStartDate(date ? date.toISOString() : null));
  };

  return (
    <Container>
      <h2>예약 가능 여부 설정하기</h2>
      <h3>11단계</h3>
      <DatePicker selected={startDate ? new Date(startDate) : null} onChange={onChangeStartDate} />
    </Container>
  );
};

export default RegisterRoomDate;
