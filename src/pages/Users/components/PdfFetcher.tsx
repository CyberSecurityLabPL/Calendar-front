import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePdf from '@/hooks/usePdf';
import React, { useState } from 'react';

const PdfFetcher = () => {
  const [month, setMonth] = useState('2024-06');

  const {
    monthlyHoursPdf,
    monthlyHoursPdfRefetch,
    monthlyHoursPdfLoading,
    monthlyHoursPdfError
  } = usePdf(month);

  const handleFetchPdf = () => {
    if (month) {
      monthlyHoursPdfRefetch();
    } else {
      alert('Please enter a month.');
    }
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          value={month}
          onChange={e => setMonth(e.target.value)}
          placeholder="Enter Month (YYYY-MM)"
          className="mb-2"
        />
      </div>
      <Button onClick={handleFetchPdf} disabled={monthlyHoursPdfLoading}>
        {monthlyHoursPdfLoading ? 'Loading...' : 'Fetch PDF'}
      </Button>
    </div>
  );
};

export default PdfFetcher;
