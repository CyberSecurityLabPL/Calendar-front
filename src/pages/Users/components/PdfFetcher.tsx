import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

type PdfFetcherProps = {
  currentMonth: string;
  pdfMutation: any;
};

const PdfFetcher: React.FC<PdfFetcherProps> = ({
  currentMonth,
  pdfMutation
}) => {
  const [month, setMonth] = useState(currentMonth);

  useEffect(() => {
    setMonth(currentMonth);
  }, [currentMonth]);

  const handleFetchPdf = () => {
    pdfMutation.mutate(month);
  };

  return (
    <div>
      <Button onClick={handleFetchPdf}>Wydrukuj pdf</Button>
    </div>
  );
};

export default PdfFetcher;
