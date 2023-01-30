import "./ProfilePopover.scss";
import { useSetRecoilState } from 'recoil';
import { userState } from '../../../utils/atom/user';
import { useNavigate } from 'react-router-dom';

export default function ProfilePopover({ isOpen, close }) {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const data = [
    {
      text: '비밀번호 변경',
      onClick: () => {
        navigate('/user/update/password')
      }
    },
    {
      text: '로그아웃',
      onClick: () => {
        localStorage.clear();
        setUser({
          accessToken: null,
          refreshToken: null,
          authority: null,
          name: null,
        })
        navigate('/')
      }
    }
  ]

  const closeAfter = (f) => {
    f();
    close();
  }

  return (
    <>
      <ul className={`profile-popover ${isOpen ? '' : 'disabled'}`}>
        {data.map((d, index) => (
          <li
            className="profile-popover-list"
            onClick={() => closeAfter(d.onClick)}
            key={index}
          >
            {d.text}
          </li>
        ))
        }
      </ul>
    </>
  )
}
