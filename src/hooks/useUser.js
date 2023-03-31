import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emptyUser, userState } from '../utils/atom/user';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { getUserInfo } from '../utils/api/user';
import { ACCESS_TOKEN } from '../utils/constant/user.constant';

export const useUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const { data } = useQuery(["getUserInfo"], () => getUserInfo(), {
    enabled: !!localStorage.getItem(ACCESS_TOKEN),
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [setUser, data, navigate]);

  return {
    user: user || emptyUser
  }
}
