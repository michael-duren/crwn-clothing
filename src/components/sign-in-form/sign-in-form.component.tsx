import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import {
  googleSignInStart,
  emailSignInStart,
  facebookSignInStart,
} from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const logFacebookUser = async () => {
    dispatch(facebookSignInStart());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
      </form>
      <ButtonsContainer>
        <Button type="submit">Sign In</Button>
        <br />
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASSES.google}
          onClick={logGoogleUser}
        >
          Sign in with Google
        </Button>
        <br />
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASSES.facebook}
          onClick={logFacebookUser}
        >
          Sign in with Facebook
        </Button>
      </ButtonsContainer>
    </SignInContainer>
  );
};

export default SignInForm;
