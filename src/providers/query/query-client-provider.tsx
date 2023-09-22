import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type QueryProviderProps = {
  children: React.ReactNode;
  client: QueryClient;
};

export const QueryProvider = ({ children, client }: QueryProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export const QueryProviderDevtools = () => {
  return <ReactQueryDevtools initialIsOpen={false} />;
};
