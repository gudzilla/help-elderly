import { useGetUserQuery } from '../../lib/api/api';

export const Profile = () => {
  const { data } = useGetUserQuery();
  // console.log('data = ', data);
  return (
    <div>
      <h2>Страница Профиля</h2>
      <h4>Имя: {data?.name}</h4>
    </div>
  );
};
