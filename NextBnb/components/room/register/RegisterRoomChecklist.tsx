import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom);

  // 숙소 유형이 활성화됐는지
  const isBuildingTypeActived = useMemo(() => {
    const { largeBuildingType, buildingType, roomType, isSetUpForGuest } = registerRoom;
    if (!largeBuildingType || !buildingType || !roomType || isSetUpForGuest === null) {
      return false;
    }
    return true;
  }, []);

  // 숙소 종류가 활성화됐는지
  const isRoomTypeActived = useMemo(() => {
    const { maximumGuestCount, bedroomCount, bedCount, bedList, publicBedList } = registerRoom;
    if (!isBuildingTypeActived || !maximumGuestCount || !bedroomCount || !bedCount) {
      return false;
    }
    return true;
  }, []);

  // 욕실 항목이 활성화됐는지
  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || !bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  // 위치 항목이 활성화됐는지
  const isLocationActived = useMemo(() => {
    const { latitude, longitude, country, city, district, streetAddress, detailAddress, postcode } =
      registerRoom;
    if (
      !isBathroomActived ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !detailAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  // 편의 시설이 활성화됐는지
  const isAmentitiesActived = useMemo(() => {
    const { amentities } = registerRoom;

    if (!isLocationActived || !amentities) {
      return false;
    }
    return true;
  }, []);

  // 공용공간이 활성화됐는지
  const isConviniencesActived = useMemo(() => {
    if (!isAmentitiesActived) {
      return false;
    }
    return true;
  }, []);

  // 사진 항목이 다 채워져 있는지
  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConviniencesActived || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  // 숙소 설명이 다 채워져 있는지
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActived || !description) {
      return false;
    }
    return true;
  }, []);

  // 숙소 제목이 다 채워져 있는지
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) {
      return false;
    }
    return true;
  }, []);

  // 숙소 금액이 채워져 있는지
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActived || !price) {
      return false;
    }
    return true;
  }, []);

  // 예약 날짜가 채워져 있는지
  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActived || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  // 진행 중인 단계
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) return 'building';
    if (!isRoomTypeActived) return 'bedrooms';
    if (!isBathroomActived) return 'bathroom';
    if (!isLocationActived) return 'location';
    if (!isAmentitiesActived) return 'amentities';
    if (!isConviniencesActived) return 'conviniences';
    if (!isPhotoActived) return 'photo';
    if (!isDescriptionActived) return 'description';
    if (!isTitleActived) return 'title';
    if (!isPriceActived) return 'price';
    if (!isDateActived) return 'date';
    return '';
  }, []);

  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <li>숙소 유형</li>
      </ul>
    </Container>
  );
};

export default RegisterRoomChecklist;
