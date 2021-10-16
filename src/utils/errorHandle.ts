import { merge } from 'ramda';
import { ReactNode } from 'react';

interface ErrorHandler {
  (e: Error): void;
}

interface ShowErrorMessage {
  (message: string | ReactNode): void;
}

interface HandlerMap extends Record<string, OptionErrorHandlerCreator> {}
interface OptionErrorHandlerCreator {
  (
    collectError: (e: Error) => void,
    showMessage: ShowErrorMessage,
  ): ErrorHandler;
}

interface ErrorHandlerCreator {
  (
    ...args: [HandlerMap, ...Parameters<OptionErrorHandlerCreator>]
  ): ErrorHandler[];
}

interface ErrorHandlerConfig {
  collectError: (e: Error) => void;
  showErrorMessage: ShowErrorMessage;
  getHandlers: ErrorHandlerCreator;
}

interface OptionErrorHandlerConfig
  extends Pick<ErrorHandlerConfig, 'showErrorMessage'> {
  getHandlers: ErrorHandlerCreator;
}

const DEFAULT_ERROR_HANDLER: Record<string, ErrorHandler> = {
  networkError: (e) => {},
};

const DEFAULT_CONFIG: ErrorHandlerConfig = {
  collectError: () => {},
  getHandlers: Object.values,
  showErrorMessage: console.log,
};

const errorHandle =
  (config: Partial<ErrorHandlerConfig>) =>
  (error: Error, options: ErrorHandler | OptionErrorHandlerConfig | null) => {
    const handler: ErrorHandler = () => {};
    // ...
    return handler(error);
  };
