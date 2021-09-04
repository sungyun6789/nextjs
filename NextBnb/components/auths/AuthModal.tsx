import React from 'react';
import SignUpModal from './SignUpModal';
import { useSelector, RootState } from '../../store';
import LoginModal from './LoginModal';

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  console.log(authMode);
  return (
    <div>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </div>
  );
};

export default AuthModal;
