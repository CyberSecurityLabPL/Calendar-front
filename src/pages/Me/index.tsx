import useHours from '@/hooks/useHours';
import useMe from '@/hooks/useMe';
import { Link } from '@tanstack/react-router';

import MyCarousel from '../Users/components/MyCarousel';

const Me = () => {
  const { me } = useMe();
  const { hours } = useHours();

  return (
    <>
      Welcome {me?.firstName} {me?.lastName}! <br /> Your email is {me?.email}.
      {me.role === 'ROLE_ADMIN' && <Link to="/users">Link to users table</Link>}
      <Link to="/calendar">Link to calendar</Link>
      {me.role === 'ROLE_USER' && <Link to="/hoursTable">Link to hours</Link>}
      {me.role === 'ROLE_USER' && (
        <div className="ml-10">
          <MyCarousel hours={hours ?? []} />
        </div>
      )}
      {me.role === 'ROLE_ADMIN' && (
        <Link to="/assignUserToManager">Link to user assignment</Link>
      )}
    </>
  );
};

export default Me;
