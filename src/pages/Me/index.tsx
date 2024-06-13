import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import useMe from '@/hooks/useMe';
import useUsers from '@/hooks/useUsers';
import { Link } from '@tanstack/react-router';

import SelectUsers from '../Users/components/selectUsers';

const Me = () => {
  const { me } = useMe();

  return (
    <>
      Welcome {me?.firstName} {me?.lastName}! <br /> Your email is {me?.email}.
      {/* 
        Below is an example of a tanstack-router link. 

        Notice how when you hover over this button you can see in your browser devtools that the data prefetches. 
        That's because we've defined a loader in the '/users' route!
      */}
      {me.role === 'ROLE_ADMIN' && <Link to="/users">Link to users table</Link>}
      <Link to="/calendar">Link to calendar</Link>
      {me.role === 'ROLE_USER' && <Link to="/hoursTable">Link to hours</Link>}
    </>
  );
};

export default Me;
