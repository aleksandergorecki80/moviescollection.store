import axios from 'axios';

export const fetchUserData = (userToken) => {
  return (dispatch) => {
    axios
      .get('/api/users/me', {
        headers: {
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        dispatch(
          fetchUserDataAction({
            name: res.data.name,
            email: res.data.email,
            token: userToken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUserDataAction = (user) => {
  return { type: 'LOAD_USER_DATA', user };
};

export const logOutUser = () => {
  return { type: 'LOG_OUT_USER', user: '' };
};
