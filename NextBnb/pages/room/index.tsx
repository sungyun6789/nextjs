import React from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store';
import RoomMain from '../../components/room/main/RoomMain';

const index: NextPage = () => {
  return <RoomMain />;
};

index.getInitialProps = async ({ query }) => {
  console.log(query);

  return {};
};

export default index;
