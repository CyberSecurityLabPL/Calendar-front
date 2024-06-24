import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import useSubordinates from '@/hooks/useSubordinates';
import { Handshake } from 'lucide-react';

const SubordinatesCard = () => {
  const { subordinates } = useSubordinates();
  const numberOfSubordinates = subordinates ? subordinates.length : 0;

  return (
    <Card className="w-86 h-64 flex flex-col justify-center items-center">
      <CardHeader className="text-center">
        <CardTitle>
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gray-200 rounded-full p-4">
              <Handshake className="text-2xl text-sky-500" />
            </div>
          </div>
          <p>Liczba podwładnych:</p>
          <p className="text-sky-500 mt-4 text-3xl"> {numberOfSubordinates}</p>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SubordinatesCard;
