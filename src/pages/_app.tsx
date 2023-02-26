import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps }}) => {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate 
        /* eslint-disable */
        // @ts-ignore
        state={pageProps.dehydratedState}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
