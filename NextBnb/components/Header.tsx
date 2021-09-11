import React, { useState } from 'react';
import styled from 'styled-components';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';
import Link from 'next/link';
import palette from '../styles/palette';
import useModal from '../hooks/useModal';
import { useSelector } from '../store';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import AuthModal from './auths/AuthModal';
import OutsideClickHandler from 'react-outside-click-handler';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper + div {
    position: relative;
  }

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }

  // 헤더 로그인 회원가입 버튼
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      font-weight: 600;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      font-weight: 600;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }

  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
`;

const Header: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 유저 메뉴 열고, 닫힘 메뉴
  const [isUsermenuOpend, setIsUsermenuOpend] = useState(false);

  // 로그아웃 하기
  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button
            type="button"
            className="header-sign-up-button"
            onClick={() => {
              dispatch(authActions.setAuthMode('signup'));
              openModal();
            }}
          >
            회원가입
          </button>
          <button
            type="button"
            className="header-login-button"
            onClick={() => {
              dispatch(authActions.setAuthMode('login'));
              openModal();
            }}
          >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
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
            <HamburgerIcon />
            <img src={user.profileImage} className="header-user-profile-image" alt="" />
          </button>
          {isUsermenuOpend && (
            <ul className="header-usermenu">
              <li>숙소 관리</li>
              <li>숙소 등록하기</li>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={logout}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
