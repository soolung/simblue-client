import Loading from "../../components/common/Loading/Loading";
import { useMutation } from "react-query";
import { getAccessTokenByGoogle } from "../../utils/api/auth";
import { useEffect } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../utils/constant/user.constant";
import { Storage } from "../../utils/storage/storage";

export default function Callback() {
  const navigate = useNavigate();

  const { mutate } = useMutation(getAccessTokenByGoogle, {
    onSuccess: (data) => {
      Storage.setItem(ACCESS_TOKEN, data.accessToken);
      Storage.setItem(REFRESH_TOKEN, data.refreshToken);
      if (!data?.login) {
        navigate("/signup");
        alert("회원가입을 해주세요");
      }
    },
    onError: (err) => {
      alert(err.response.data.message);
    },
  });

  useEffect(() => {
    const q = queryString.parse(window.location.search);
    if (q.code !== undefined) {
      mutate(q.code);
    }
  }, []);

  return <Loading />;
}
