import { NextPage } from 'next';
import React from 'react';
import RoomDetail from '../../components/room/detail/RoomDetail';
import { getRoomAPI } from '../../lib/api/room';
import { roomActions } from '../../store/room';

const roomDetail: NextPage = () => {
  return <RoomDetail />;
};

roomDetail.getInitialProps = async ({ query, store }) => {
  const { id } = query;

  try {
    if (id) {
      const { data } = await getRoomAPI(Number(id as string));
      store.dispatch(roomActions.setDetailRoom(data));
    }
  } catch (error) {
    console.log(error);
  }

  return {};
};

export default roomDetail;
