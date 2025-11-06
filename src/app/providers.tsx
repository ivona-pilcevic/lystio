"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import LazyLoaderProgress from "@/components/LazyLoaderProgress";
import { antdTheme } from "@/theme/antd-theme";
import { styledTheme } from "@/theme/styled-theme";
import { GlobalStyles } from "@/theme/globals";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => queryClient);

  return (
    <QueryClientProvider client={qc}>
      <ConfigProvider theme={antdTheme}>
        <AntApp>
          <ThemeProvider theme={styledTheme}>
            <GlobalStyles />
            <Suspense fallback={<LazyLoaderProgress />}>{children}</Suspense>
          </ThemeProvider>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
