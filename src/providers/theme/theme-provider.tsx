import { MantineProvider } from "@mantine/core";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <MantineProvider>{children}</MantineProvider>;
};
