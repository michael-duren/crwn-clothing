import { userReducer, USER_INITIAL_STATE } from './user.reducer';

import USER_ACTION_TYPES from './user.types';

describe('userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(USER_INITIAL_STATE);
  });

  it('user sign in success ', () => {
    const mockUser = {
      email: 'michaeld@michaelduren.com',
      password: 'Michael',
    };

    expect(
      userReducer(USER_INITIAL_STATE, {
        type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
        payload: mockUser,
      })
    ).toEqual({ ...USER_INITIAL_STATE, currentUser: mockUser });
  });

  it('user sign out success', () => {
    expect(
      userReducer(USER_INITIAL_STATE, {
        type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
        payload: {},
      })
    ).toEqual(USER_INITIAL_STATE);
  });

  it('should set errorMessage to payload on signInFailed, signUpFailed, and signOutFailed', () => {
    const mockError = {
      message: 'WARNING',
      code: 404,
    };

    expect(
      userReducer(USER_INITIAL_STATE, {
        type: USER_ACTION_TYPES.SIGN_IN_FAILED,
        payload: mockError,
      })
    ).toEqual({ ...USER_INITIAL_STATE, error: mockError });

    expect(
      userReducer(USER_INITIAL_STATE, {
        type: USER_ACTION_TYPES.SIGN_UP_FAILED,
        payload: mockError,
      })
    ).toEqual({ ...USER_INITIAL_STATE, error: mockError });

    expect(
      userReducer(USER_INITIAL_STATE, {
        type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
        payload: mockError,
      })
    ).toEqual({ ...USER_INITIAL_STATE, error: mockError });
  });
});
