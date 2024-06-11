import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePdf from '@/hooks/usePdf';
import React, { useEffect, useState } from 'react';

type PdfFetcherProps = {
  currentMonth: () => string;
};

const PdfFetcher: React.FC<PdfFetcherProps> = ({ currentMonth }) => {
  const [month, setMonth] = useState(currentMonth() || '2024-06');
  const { pdfMutation } = usePdf(month);

  const handleFetchPdf = () => {
    const month = currentMonth();
    pdfMutation.mutate(month);
  };

  return (
    <div>
      <Button onClick={handleFetchPdf}>Wydrukuj pdf</Button>
    </div>
  );
};

export default PdfFetcher;
