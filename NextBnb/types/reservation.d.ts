// 숙소 에약 타입
export type StoredReservation = {
  id: number;
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
  createdAt: string;
  updatedAt: string;
};
