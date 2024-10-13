import { useContext } from 'react';

import { AppDimensionsContext } from '@/components/App/AppDimensionsContext';

export function useAppDimensionsContext() {
  return useContext(AppDimensionsContext);
}
