import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAuthToken = () => {
      const urlParams = new URLSearchParams(location.search);
      const isLogin = urlParams.get('isLogin') === 'true';
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');


      if (isLogin && accessToken && refreshToken) {
        try {
          Cookies.set('accessToken', accessToken, {
            expires: 1 / 48,  // 30 minutes
            path: '/',
            // secure: true,
            sameSite: 'Lax',
          });
          Cookies.set('refreshToken', refreshToken, {
            expires: 1 / 48,  // 30 minutes
            path: '/',
            // secure: true,
            sameSite: 'Lax',
          });

          navigate('/');
        } catch (error) {
          console.error('Error storing tokens', error);
        }
      } else {
        navigate('/signup');
      }
    };

    fetchAuthToken();
  }, [location.search, navigate]);

  return (
    <div>
      <h2>인증 처리 중...</h2>
    </div>
  );
};

export default AuthCallback;
