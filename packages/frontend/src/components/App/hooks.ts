import { useContext } from 'react';

import { AppDimensionsContext } from './AppEngine';

export function useAppDimensionsContext() {
  return useContext(AppDimensionsContext);
}
