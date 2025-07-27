import { IMessageService } from './IMessageService';

export class RateLimitProxy implements IMessageService {
  private lastCall = 0;

  constructor(
    private wrappee: IMessageService,
    private intervalMs: number
  ) {}

  send(message: string): void {
    const now = Date.now();
    if (now - this.lastCall >= this.intervalMs) {
      this.lastCall = now;
      this.wrappee.send(message);
    } else {
      console.log('[RateLimit] skipped');
    }
  }
}

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  return new RateLimitProxy(service, intervalMs);
}
