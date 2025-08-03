type MessageMethod = (message: string) => void;

export function withTimestamp(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as MessageMethod;

  descriptor.value = function (message: string) {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `[${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
    const modifiedMessage = `${timestamp} ${message}`;
    originalMethod.call(this, modifiedMessage);
  };
}

export function uppercase(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as MessageMethod;

  descriptor.value = function (message: string) {
    const modifiedMessage = message.toUpperCase();
    originalMethod.call(this, modifiedMessage);
  };
}
