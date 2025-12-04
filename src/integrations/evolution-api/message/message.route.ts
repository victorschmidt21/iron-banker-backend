import { AxiosInstance } from 'axios';
import { MessageSendRequest } from './message.interface';

export class MessageRoute {
  server: AxiosInstance;
  basePath: string;
  instance: string | undefined;

  constructor(server: AxiosInstance) {
    this.server = server;
    this.basePath = '/message';
    this.instance = process.env.EVOLUTION_INSTANCE_ID;
  }

  async sendMessage(data: MessageSendRequest): Promise<any> {
    try {
      const response = await this.server.post(
        `${this.basePath}/sendText/${this.instance}`,
        data,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
