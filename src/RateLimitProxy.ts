import { IMessageService } from './IMessageService';

export function createRateLimitProxy(wrappee: IMessageService, intervalMs: number): IMessageService {
  let lastSentTime = 0;

  return new Proxy(wrappee, {
    get(target, prop) {
      if (prop === 'send') {
        return (message: string) => {
          const now = Date.now();
          if (now - lastSentTime >= intervalMs) {
            target.send(message);
            lastSentTime = now;
          } else {
            console.log('[RateLimit] skipped');
          }
        };
      }
      const value = (target as any)[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    }
  });
}
