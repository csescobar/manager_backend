import { createContext } from 'react';

const StoreContext = createContext({
  token: null,
  setToken: (token: string) => { },
});

export default StoreContext;