import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { client } from '../client';
import { getUserInfo } from '../services/google';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

const Login = () => {

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      localStorage.setItem('google_access_token', tokenResponse.access_token);
      const user = await getUserInfo()
      const { name, sub, picture } = user;
      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
      }
      client.createIfNotExists(doc)
        .then(() => {
          navigate('/', { replace: true })
        })
    },
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt='logo' />
          </div>
          <button
            type="button"
            className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
            onClick={login}
          >
            <FcGoogle className="mr-4" /> Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;