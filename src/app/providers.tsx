"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import LazyLoaderProgress from "@/components/LazyLoaderProgress";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const theme = {
  colors: {
    primary: "#A540F3",
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => queryClient);

  return (
    <QueryClientProvider client={qc}>
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LazyLoaderProgress />}>{children}</Suspense>
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
