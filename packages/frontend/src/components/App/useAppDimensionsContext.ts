import { useContext } from 'react';

import { AppDimensionsContext } from './AppDimensionsContext';

export function useAppDimensionsContext() {
  return useContext(AppDimensionsContext);
}
