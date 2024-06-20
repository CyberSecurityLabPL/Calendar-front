import { Card } from '@/components/ui/card';
import useHours from '@/hooks/useHours';
import useMe from '@/hooks/useMe';
import { Link } from '@tanstack/react-router';

import MyCarousel from '../Users/components/MyCarousel';
import SubordinatesCard from '../Users/components/SubordinatesCard';
import SubordinatesInfo from '../Users/components/SubordinatesInfo';

const Me = () => {
  const { me } = useMe();
  const { hours } = useHours();

  return (
    <div className="py-2 px-10">
      <Card className="p-4 mb-4 text-center">
        <div className="mb-4">
          Welcome {me?.firstName} {me?.lastName}! <br /> Your email is{' '}
          {me?.email}.
        </div>
      </Card>
      <div className="flex flex-wrap gap-4">
        {me.role === 'ROLE_ADMIN' && (
          <div className="flex-1 min-w-[200px]">
            <Card className="p-4 mb-4  text-center">
              <Link to="/users">Link to users table</Link>
            </Card>
          </div>
        )}
        <div className="flex-1 min-w-[200px]">
          <Card className="p-4 mb-4  text-center">
            <Link to="/calendar">Link to calendar</Link>
          </Card>
        </div>
        {me.role === 'ROLE_USER' && (
          <div className="flex-1 min-w-[200px]">
            <Card className="p-4 mb-4 text-center">
              <Link to="/hoursTable">Link to hours</Link>
            </Card>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {me.role === 'ROLE_USER' && (
          <div className="flex-1 min-w-[200px]">
            <MyCarousel hours={hours ?? []} />
          </div>
        )}
        {me.role === 'ROLE_ADMIN' && (
          <div className="flex-1 min-w-[200px]">
            <Card className="p-4 mb-4 text-center">
              <Link to="/assignUserToManager">Link to user assignment</Link>
            </Card>
          </div>
        )}
        {me.role === 'ROLE_MANAGER' && (
          <div className="flex-1 min-w-[200px]">
            <SubordinatesCard />
          </div>
        )}
        {me.role === 'ROLE_MANAGER' && (
          <div className="flex-2 min-w-[200px]">
            <SubordinatesInfo />
          </div>
        )}
      </div>
    </div>
  );
};

export default Me;
