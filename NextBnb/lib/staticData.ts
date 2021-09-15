export const monthList = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

// 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 2020년부터 1900년까지
export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));

// 숙소 큰 범위의 건물 유형
export const largeBuildingTypeList = ['아파트', '주택', '별채', '독특한 숙소', 'B&B', '부티크호텔'];
