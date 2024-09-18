import { createContext } from 'react';

type AppDimensionsContextType = {
  width: number;
  height: number;
};

export const AppDimensionsContext = createContext<AppDimensionsContextType>({
  width: 0,
  height: 0,
});
