import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_BASEURL;

const axiosPublic = axios.create({
  baseURL
})

export default axiosPublic

axiosPublic.interceptors.response.use(
  (response) => response,
  errorToast
);

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

async function errorToast(error)  {
  let err: string;
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    err = error.response?.data?.message;
  } else {
    err = 'Something went wrong';
  }
  toast.error(err, {
    autoClose: 3000,
    closeOnClick: true,
    theme: 'light',
    transition: Bounce,
  });
  throw(error)
  // return <Navigate to="/login" />;
}

// const responseIntercept = axiosPrivate.interceptors.response.use(
//   (response) => response,
//   errorToast
// );