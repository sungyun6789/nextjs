import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpendEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';
import { monthList, dayList, yearList } from '../../lib/staticData';
import Selector from '../common/Selector';
import Button from '../common/Button';
import { signupAPI } from '../../pages/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { commonActions } from '../../store/common';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      ::placeholder {
        color: ${palette.gray_76};
      }
    }
    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    }
  }
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthdat-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

// 비밀번호 최소 자리수
const PASSWORD_MIN_LENGTH = 8;

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const { setValidateMode } = useValidateMode();

  const dispatch = useDispatch();

  // 이메일 주소 변경 시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 이름 주소 변경 시
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  // 성 변경 시
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  // 비밀번호 변경 시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [hidePassword, setHidePassword] = useState(true);

  // 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // 생년월일 월 변경 시
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthMonth(event.target.value);

  // 생년월일 일 변경 시
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthDay(event.target.value);

  // 생년월일 년 변경 시
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBirthYear(event.target.value);

  // 회원가입 폼 입력 값 확인하기
  const validateSignUpForm = () => {
    // 인풋 값이 없다면
    if (!email || !lastname || !firstname || !password) {
      return false;
    }
    // 비밀번호가 올바르지 않다면
    if (isPasswordHasNameOrEmail || !isPasswordOverMinLength || isPasswordHasNumberOrSymbol) {
      return false;
    }
    // 생년월일 셀렉터 값이 없다면
    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  // 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);
    console.log(validateSignUpForm());

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`,
          ).toISOString(),
        };
        const { data } = await signupAPI(signUpBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [passwordFocused, setPasswordFocused] = useState(false);
  // 비밀번호 인풋 포커스 되었을 때
  const onFocusPassword = () => {
    setPasswordFocused(true);
  };
  // 비밀번호가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split('@')[0]),
    [password, lastname, email],
  );
  // 비밀번호가 최소 자릿수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  );
  // 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () => !(/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) || /[0-9]/g.test(password)),
    [password],
  );

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예:길동)"
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예:홍)"
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="성을 입력하세요."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? 'password' : 'text'}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpendEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail && !isPasswordOverMinLength && !isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning isValid={!isPasswordOverMinLength} text="최소 8자" />
          <PasswordWarning isValid={isPasswordHasNumberOrSymbol} text="숫자나 기호를 포함하세요." />
        </>
      )}
      <p className="sign-up-birthdat-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비앤비 이용자에게
        공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={['월']}
            defaultValue="월"
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue="일"
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span className="sign-up-modal-set-login" role="presentation" onClick={() => {}}>
          로그인
        </span>
      </p>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;
