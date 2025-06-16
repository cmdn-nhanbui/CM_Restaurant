export const loggerMiddleware = () => (next: any) => (action: any) => {
  next(action);
};
