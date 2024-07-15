import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import useSubordinates from '@/hooks/useSubordinates';
import { User } from '@/types/User';
import { Info } from 'lucide-react';

const SubordinatesInfo = () => {
  const { subordinates } = useSubordinates();

  return (
    <Card className="w-86 h-64 flex flex-col justify-center items-center">
      <CardHeader className="text-center">
        <CardTitle>
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gray-200 rounded-full p-4">
              <Info className="text-2xl text-sky-500" />
            </div>
          </div>
          <h1 className="text-sky-500 mb-4">Lista podwładnych:</h1>
          <p className="mb-4 font-thin">Imię Naziwsko e-mail Stanowisko</p>
          <ul>
            {subordinates &&
              subordinates.map((subordinate: User) => (
                <li key={subordinate.id}>
                  {subordinate.firstName} {subordinate.lastName}{' '}
                  {subordinate.email} {subordinate.position}{' '}
                </li>
              ))}
          </ul>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SubordinatesInfo;
