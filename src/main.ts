import { MessageService } from './MessageService';
import { TimestampDecorator, UppercaseDecorator } from './decorators';
import { createRateLimitProxy } from './RateLimitProxy';

const baseService = new MessageService();
const decorated = new UppercaseDecorator(new TimestampDecorator(baseService));

const service = createRateLimitProxy(decorated, 1000);

console.log('Тестуємо систему анти-спаму:');
service.send('Привіт! Як справи?');
service.send('Чому не відповідаєш?');

setTimeout(() => {
  service.send('Це повідомлення вже пройде, бо ми почекали 1 секунду');
}, 1100);
