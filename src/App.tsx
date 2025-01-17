import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { ConfigProvider } from 'antd';
import { DocumentEditor, ProviderTree } from './components';
import { createProviderConfig } from './components/ProviderTree/ProviderTree';
import { NotificationProvider } from './contexts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes,
    },
  },
});

const App = () => {
  const convertToPx = (value: string) => Number(value.replace('px', ''));

  const antdTheme = {
    token: {
      colorPrimary: theme.colors.primary_6,
      colorError: theme.colors.red_6,
      fontSize: convertToPx(theme.fontSizes.body),
      borderRadius: convertToPx(theme.radii.medium),
    },
  };

  // Please define your providers and their configurations here
  // note that the order of the providers is important
  // the first provider will be the outermost provider
  const providersAndConfigs = [
    createProviderConfig(QueryClientProvider, { client: queryClient }),
    createProviderConfig(ThemeProvider, { theme } as any),
    createProviderConfig(ConfigProvider, {
      theme: antdTheme,
    }),
    createProviderConfig(BrowserRouter),
    createProviderConfig(NotificationProvider),
  ];

  return (
    <ProviderTree providers={providersAndConfigs}>
      <DocumentEditor />
    </ProviderTree>
  );
};

export default App;
