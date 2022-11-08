// import { createContext, useEffect, useReducer } from 'react';

// import createAction from '../utils/reducer/reducer.utils';

// // The actual value you want to access.
// export const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => null,
// });

// export const UserProvider = ({ children }) => {
//   const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

//   const setCurrentUser = (user) => {
//     dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
//   };

//   const value = { currentUser, setCurrentUser };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
