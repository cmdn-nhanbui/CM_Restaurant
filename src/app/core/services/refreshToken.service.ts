import axios from 'axios';
import * as Cookies from 'js-cookie';
import { TOKEN } from '../constants/tokens';

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get(TOKEN.REFRESH_TOKEN) || '';

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    Cookies.set(TOKEN.ACCESS_TOKEN, response.data.newAccessToken);
    Cookies.set(TOKEN.REFRESH_TOKEN, response.data.newRefreshToken);
    return response.data.accessToken;
  } catch (error) {
    return null;
  }
};
