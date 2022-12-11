import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selector';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';
import { LoggedInConfirmation } from './authentication.styles';

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);

  return (
    <AuthenticationContainer>
      {currentUser ? (
        <LoggedInConfirmation>
          <h1>Hello {currentUser.displayName},</h1>
          <p>You are currently logged in</p>
        </LoggedInConfirmation>
      ) : (
        <>
          <SignInForm></SignInForm>
          <SignUpForm></SignUpForm>
        </>
      )}
    </AuthenticationContainer>
  );
};

export default Authentication;
