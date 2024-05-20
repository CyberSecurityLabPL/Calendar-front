
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useMe from '@/hooks/useMe';
import { Link } from '@tanstack/react-router';
import {  UserForm } from '../UserForm';



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
      <Link
        to="/users"
        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/20">
        Link to users
      </Link>
      <Link to="/usersTable">Link to users table</Link>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Dodaj użytkownika</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dane użytkownika</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2 h-full">
              <UserForm></UserForm>
            </div>

          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Me;
