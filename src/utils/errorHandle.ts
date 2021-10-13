import { merge } from 'ramda';
import { ReactNode } from 'react';

interface ErrorHandler {
  (e: Error): void;
}

interface ShowErrorMessage {
  (message: string | ReactNode): void;
}

interface ErrorHandlerConfig {
  collectError: (e: Error) => void;
  silentHandlers: ErrorHandler[];
  showErrorMessage: ShowErrorMessage;
}
interface ReplaceErrorHandlerConfig {
  replaceErrorHandlerConfig: (config: ErrorHandlerConfig) => ErrorHandlerConfig;
}

const DEFAULT_ERROR_HANDLER: Record<string, ErrorHandler> = {
  networkError: (e) => {},
};

const DEFAULT_CONFIG: ErrorHandlerConfig = {
  collectError: () => {},
  silentHandlers: [],
  showErrorMessage: console.log,
};

const errorHandle = (
  config: Partial<ErrorHandlerConfig>,
  replaceHandle: Error | ShowErrorMessage | ReplaceErrorHandlerConfig | null,
) => {
  const mergeConfig = merge(config, DEFAULT_CONFIG);
  if (replaceHandle === undefined) {
    replaceHandle = mergeConfig.showErrorMessage;
  }
};
