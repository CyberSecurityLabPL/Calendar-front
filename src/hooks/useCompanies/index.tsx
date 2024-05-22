import { useSuspenseQuery } from '@tanstack/react-query';

import { companiesQueryOptions } from './companiesQueryOptions';

const useCompanies = () => {
  const {
    data: companies,
    refetch: companiesRefetch,
    isLoading: companiesLoading,
    isError: companiesError
  } = useSuspenseQuery(companiesQueryOptions);

  return {
    companies: companies ?? [],
    companiesRefetch,
    companiesLoading,
    companiesError
  };
};

export default useCompanies;
