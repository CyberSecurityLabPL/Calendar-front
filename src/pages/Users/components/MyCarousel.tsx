import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Hours } from '@/types/Hours';
import { Clock, Clock4, Clock9 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface MyCarouselProps {
  hours: Hours[];
}

const MyCarousel: React.FC<MyCarouselProps> = ({ hours }) => {
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [previousMonth, setPreviousMonth] = useState<string>('');
  const [twoMonthsAgo, setTwoMonthsAgo] = useState<string>('');
  const [totalHoursCurrent, setTotalHoursCurrent] = useState<number>(0);
  const [totalHoursPrevious, setTotalHoursPrevious] = useState<number>(0);
  const [totalHoursTwoMonthsAgo, setTotalHoursTwoMonthsAgo] =
    useState<number>(0);

  useEffect(() => {
    const date = new Date();

    const current = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toLocaleString('default', { month: 'long' });

    const previous = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      1
    ).toLocaleString('default', { month: 'long' });

    const twoAgo = new Date(
      date.getFullYear(),
      date.getMonth() - 2,
      1
    ).toLocaleString('default', { month: 'long' });

    setCurrentMonth(current);
    setPreviousMonth(previous);
    setTwoMonthsAgo(twoAgo);
  }, []);

  useEffect(() => {
    if (!hours) return;
    if (hours.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const totalHoursCurrent = calculateTotalHoursForMonth(
        hours,
        currentMonth,
        currentYear
      );
      const totalHoursPrevious = calculateTotalHoursForMonth(
        hours,
        currentMonth - 1,
        currentYear
      );
      const totalHoursTwoMonthsAgo = calculateTotalHoursForMonth(
        hours,
        currentMonth - 2,
        currentYear
      );

      setTotalHoursCurrent(totalHoursCurrent);
      setTotalHoursPrevious(totalHoursPrevious);
      setTotalHoursTwoMonthsAgo(totalHoursTwoMonthsAgo);
    }
  }, [hours]);

  const calculateTotalHoursForMonth = (
    hours: Hours[],
    month: number,
    year: number
  ): number => {
    return hours
      .filter(hour => {
        const startDate = new Date(hour.startTime);
        return (
          startDate.getMonth() === month && startDate.getFullYear() === year
        );
      })
      .reduce((acc, hour) => {
        const start = new Date(hour.startTime).getTime();
        const end = new Date(hour.endTime).getTime();
        const hoursDiff = (end - start) / 1000 / 60 / 60;
        return acc + hoursDiff;
      }, 0);
  };

  return (
    <Carousel
      opts={{
        align: 'end',
        loop: true
      }}>
      <CarouselContent className="mr-1">
        <CarouselItem>
          <Card className="w-86 h-64 flex flex-column justify-center items-center">
            <CardHeader className="text-center">
              <CardTitle>
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-gray-200 rounded-full p-4">
                    <Clock className="text-2xl text-sky-500" />
                  </div>
                </div>
                <h1>Obecny miesiąc:</h1>
                <h2 className="text-sky-500">{currentMonth}</h2>
                <p>Przepracowane godziny:</p>
                <p className="text-sky-500"> {totalHoursCurrent}</p>
              </CardTitle>
            </CardHeader>
          </Card>
        </CarouselItem>

        <CarouselItem>
          <Card className="w-86 h-64 flex flex-column justify-center items-center">
            <CardHeader className="text-center">
              <CardTitle>
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-gray-200 rounded-full p-4">
                    <Clock4 className="text-2xl text-sky-500" />
                  </div>
                </div>
                <h1>Wcześniejszy miesiąc: </h1>
                <h2 className="text-sky-500">{previousMonth}</h2>
                <p>Przepracowane godziny:</p>
                <p className="text-sky-500"> {totalHoursPrevious}</p>
              </CardTitle>
            </CardHeader>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="w-86 h-64 flex flex-column justify-center items-center">
            <CardHeader className="text-center">
              <CardTitle>
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-gray-200 rounded-full p-4">
                    <Clock9 className="text-2xl text-sky-500" />
                  </div>
                </div>
                <h1>2 miesiące temu:</h1>
                <h2 className="text-sky-500">{twoMonthsAgo}</h2>
                <p>Przepracowane godziny:</p>
                <p className="text-sky-500"> {totalHoursTwoMonthsAgo}</p>
              </CardTitle>
            </CardHeader>
          </Card>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MyCarousel;
