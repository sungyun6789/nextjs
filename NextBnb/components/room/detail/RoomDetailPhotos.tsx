import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  max-height: 465px;
  margin-bottom: 48px;

  .room-detail-one-photo {
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
`;

const RoomDetailPhotos: React.FC = () => {
  const roomTitle = useSelector((state) => state.room.detail?.title);
  const photos = useSelector((state) => state.room.detail?.photos);

  if (!photos) {
    return null;
  }

  if (photos.length === 1) {
    return (
      <Container>
        <div className="room-detail-one-photo">
          <img src={photos[0]} alt={roomTitle} />
        </div>
      </Container>
    );
  }
  return <></>;
};

export default RoomDetailPhotos;
