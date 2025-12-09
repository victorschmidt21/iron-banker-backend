import axios, { AxiosInstance } from 'axios';
import { MessageRoute } from './message/message.route';
import { AudioRoute } from './audio/audio.route';
export class EvolutionApiIntegration {
  server: AxiosInstance;
  MessageRoute: MessageRoute;
  AudioRoute: AudioRoute;
  
  constructor() {
    this.server = axios.create({
      baseURL: process.env.EVOLUTION_API_URL,
      headers: {
        apikey: process.env.EVOLUTION_API_KEY || '',
        'Content-Type': 'application/json',
      },
    });

    this.MessageRoute = new MessageRoute(this.server);
    this.AudioRoute = new AudioRoute(this.server);
  }
}
