import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ReactNode, useEffect } from "react";
import { ChakraProvider, theme, useToast } from "@chakra-ui/react";
import {Provider} from 'react-redux';
import { store } from "@/services/redux-store/store";
const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
};

export default App;
