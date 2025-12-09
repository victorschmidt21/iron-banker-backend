import { AxiosInstance } from 'axios';

export class AudioRoute {
  server: AxiosInstance;
  basePath: string;
  instance: string | undefined;

  constructor(server: AxiosInstance) {
    this.server = server;
    this.instance = process.env.EVOLUTION_INSTANCE_ID;
  }

  async download(messageId: string) {
    try {
      const response = await this.server.post(
        `/chat/getBase64FromMediaMessage/${this.instance}`,
        {
          message: {
            key: {
              id: messageId,
            },
          },
          convertToMp4: true,
        },
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
