// hook/useGetAllApplication.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRoleApplications } from '../redux/roleApplicationSlice';

const useGetAllApplication = (keyword = '') => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.roleApplications.applications);
  const loading = useSelector((state) => state.roleApplications.loading);

  useEffect(() => {
    dispatch(fetchAllRoleApplications(keyword));
  }, [dispatch, keyword]);

  return { applications, loading };
};

export default useGetAllApplication;