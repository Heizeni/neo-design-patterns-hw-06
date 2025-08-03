import { IMessageService } from './IMessageService';
import { withTimestamp, uppercase } from './decorators';

export class MessageService implements IMessageService {
  @uppercase
  @withTimestamp
  send(message: string): void {
    console.log(message);
  }
}
