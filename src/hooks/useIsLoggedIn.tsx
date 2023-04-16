import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/selectors';

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginInternalStatus: boolean = useSelector(selectIsLoggedIn);

  useEffect(() => {
    setIsLoggedIn(loginInternalStatus);
  }, [loginInternalStatus]);

  return isLoggedIn;
}
