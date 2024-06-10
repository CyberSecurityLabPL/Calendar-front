import useMe from '@/hooks/useMe';
import { Link } from '@tanstack/react-router';

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
      <Link to="/users">Link to users table</Link>
      <Link to="/calendar">Link to calendar</Link>
      <Link to="/hoursTable">Link to hours</Link>
    </>
  );
};

export default Me;
