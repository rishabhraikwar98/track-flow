import { useAppSelector } from './useRedux';

export const useAuth = () => {
const { user, loading, error } = useAppSelector((state) => state.auth);
  return {
    user,
    loading,
    error,
  };
};
export default useAuth;