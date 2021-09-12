import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import HambugerIcon from '../public/static/svg/header/hamburger.svg';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import { useSelector } from '../store';

const HeaderUserProfile: React.FC = () => {
  // 유저 메뉴 열고, 닫힘 여부
  const [isUsermenuOpend, setIsUsermenuOpend] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpend) {
          setIsUsermenuOpend(false);
        }
      }}
    >
      <button
        className="header-user-profile"
        type="button"
        onClick={() => setIsUsermenuOpend(!isUsermenuOpend)}
      >
        <HambugerIcon />
        <img src={userProfileImage} className="header-user-profile-image" alt="" />
      </button>
      {isUsermenuOpend && (
        <ul className="header-usermenu">
          <li>숙소 관리</li>
          <Link href="/room/register/building">
            <a
              role="presentation"
              onClick={() => {
                setIsUsermenuOpend(false);
              }}
            >
              <li>숙소 등록하기</li>
            </a>
          </Link>
          <div className="header-usermenu-divider">
            <li role="presentation" onClick={logout}>
              로그아웃
            </li>
          </div>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
