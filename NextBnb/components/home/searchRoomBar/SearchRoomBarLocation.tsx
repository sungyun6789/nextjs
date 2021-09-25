import React, { useRef, useState } from 'react';
import OutsizeClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import { searchRoomActions } from '../../../store/searchRoom';
import palette from '../../../styles/palette';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;
    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      // text-overflow - 사용자에게 잘린 텍스트를 어떻게 보여줄지 설정
      text-overflow: ellipsis; // width가 넘어가면 ... 으로 표시
      // white-space - 공백 문자를 처리하는 방법
      white-space: nowrap; // 공백을 없애고 줄 바꿈은 br요소로만 이루어짐
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }
  .search-roo-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;
    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

const SearchRoomBarLocation: React.FC = () => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.searchRoom.location);
  const [popupOpend, setPopupOpend] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 위치 변경하기
  const setLocationDispatch = (value: string) => {
    dispatch(searchRoomActions.setLocation(value));
  };

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpend(true);
  };

  return (
    <Container onClick={onClickInput}>
      <OutsizeClickHandler onOutsideClick={() => setPopupOpend(false)}>
        <div className="search-room-bar-location-texts">
          <p className="search-room-bar-location-label">위치</p>
          <input
            value={location}
            onChange={(e) => setLocationDispatch(e.target.value)}
            placeholder="어디로 여행 가세요?"
            ref={inputRef}
          />
        </div>
        {popupOpend && (
          <ul className="search-roo-bar-location-results">
            <li>근처 추천 장소</li>
          </ul>
        )}
      </OutsizeClickHandler>
    </Container>
  );
};

export default SearchRoomBarLocation;
