// hook/useGetAllRoleApplication.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRoleApplications } from '../redux/roleApplicationSlice';

const useGetAllApplication = (keyword = '') => {
  const dispatch = useDispatch();
  
  // Corrected path based on store configuration
  const applications = useSelector((state) => state.roleApplication.applications);
  const loading = useSelector((state) => state.roleApplication.fetchAllStatus === 'loading');

  useEffect(() => {
    dispatch(fetchAllRoleApplications(keyword));
  }, [dispatch, keyword]);

  return { applications, loading };
};

export default useGetAllApplication;
