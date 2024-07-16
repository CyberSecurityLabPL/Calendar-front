import { URLS } from '@/config/urls';
import { HoursPdf } from '@/types/HoursPdf';
import { Axios } from '@/utils/Axios';
import { useMutation } from '@tanstack/react-query';

const usePdf = (month: string, userId: string | null) => {
  const pdfMutation = useMutation({
    mutationFn: (): Promise<HoursPdf | void> =>
      Axios.get(URLS.GET_MONTHLY_HOURS_PDF(month), {
        params: { userId: userId },
        responseType: 'blob'
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `hours-${month}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
  });

  return {
    pdfMutation
  };
};

export default usePdf;
