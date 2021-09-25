import { NextApiResponse, NextApiRequest } from 'next';
import isEmpty from 'lodash/isEmpty';
import { StoredRoomType } from '../../../types/room';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const {
      checkInDate,
      CheckOutDate,
      adultCount,
      latitude,
      longitude,
      limit,
      page = '1',
    } = req.query;

    try {
      const rooms = Data.room.getList();

      // 개수 자르기
      const limitedRooms = rooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));
      // host 정보 넣기
      const roomsWithHost = await Promise.all(
        limitedRooms.map(async (room) => {
          const host = Data.user.find({ id: room.hostId });
          return { ...room, host };
        }),
      );
      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === 'POST') {
    // 숙소 등록하기
    try {
      const {
        largeBuildingType,
        buildingType,
        roomType,
        isSetUpForGuest,
        maximumGuestCount,
        bedroomCount,
        bedCount,
        bedList,
        publicBedList,
        bathroomCount,
        bathroomType,
        latitude,
        longitude,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        amentities,
        conveniences,
        photos,
        description,
        title,
        price,
        startDate,
        endDate,
        hostId,
      } = req.body;
      if (
        !largeBuildingType ||
        !buildingType ||
        !roomType ||
        !isSetUpForGuest ||
        !maximumGuestCount ||
        !bedroomCount ||
        !bedCount ||
        !bedList ||
        !publicBedList ||
        !bathroomCount ||
        !bathroomType ||
        !latitude ||
        !longitude ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        !detailAddress ||
        !postcode ||
        !amentities ||
        !conveniences ||
        !photos ||
        !description ||
        !title ||
        !price ||
        !startDate ||
        !endDate ||
        !hostId
      ) {
        res.statusCode = 400;
        res.send('필수 값이 없습니다.');
      }
      const rooms = Data.room.getList();
      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.end();
    } catch (error: any) {
      console.log(error);
      return res.send(error.message);
    }
  }
  res.statusCode = 405;

  return res.end();
};
