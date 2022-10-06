import {
  signInWithGooglePopup,
  signInWithFacebookPopup,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { useState } from 'react';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const logFacebookUser = async () => {
    await signInWithFacebookPopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('user not found, please sign up for an account');
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <div className="sign-in-container">
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
      <div className="buttons-container">
        <Button type="submit" onClick={handleSubmit}>
          Sign In
        </Button>
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
      </div>
    </div>
  );
};

export default SignInForm;
