import { compose, merge, map } from 'ramda';
import { ReactNode } from 'react';

interface ErrorHandler {
  (e: Error): void;
}

interface ShowErrorMessage {
  (message: string | ReactNode): void;
}

interface HandlerMap extends Record<string, HandlerCreator> {}
interface HandlerCreator {
  (
    collectError: (e: Error) => void,
    showMessage: ShowErrorMessage,
  ): ErrorHandler;
}

interface ConfigHandlerCreator {
  (...args: [HandlerMap, ...Parameters<HandlerCreator>]): ErrorHandler;
}

interface ErrorHandlerConfig {
  collectError: (e: Error) => void;
  showErrorMessage: ShowErrorMessage;
  getHandlers: (
    ...parameters: Parameters<ConfigHandlerCreator>
  ) => ErrorHandler[];
}

interface OptionErrorHandlerConfig
  extends Pick<ErrorHandlerConfig, 'showErrorMessage'> {
  getHandlers: ConfigHandlerCreator;
}

const DEFAULT_ERROR_HANDLER: Record<string, ErrorHandler> = {
  networkError: (e) => {},
};

const DEFAULT_CONFIG: ErrorHandlerConfig = {
  collectError: () => {},
  showErrorMessage: console.log,
  getHandlers: (handlerMap, collectError, showErrorMessage) => {
    const formate = compose(
      map((fn) => fn(collectError, showErrorMessage)),
      Object.values,
    );
    return formate(handlerMap);
  },
};

const errorHandle =
  (config: Partial<ErrorHandlerConfig>) =>
  (error: Error, options: ErrorHandler | OptionErrorHandlerConfig | null) => {
    const handler: ErrorHandler = () => {};
    // ...
    return handler(error);
  };
