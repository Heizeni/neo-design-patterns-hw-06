import { MessageService } from './MessageService';
import { createRateLimitProxy } from './RateLimitProxy';

const rawService = new MessageService();
const rateLimitedService = createRateLimitProxy(rawService, 1000); // 1 секунда

console.log("Тестуємо систему анти-спаму:");
rateLimitedService.send("Привіт! Як справи?");
rateLimitedService.send("Чому не відповідаєш?");

setTimeout(() => {
  rateLimitedService.send("Це повідомлення вже пройде, бо ми почекали 1 секунду");
}, 1100);
