export interface ReceivedMessageEvolutionDto {
  event: string;
  instance: string;
  data: {
    key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
      participant: string;
    };
    pushName: string;
    status: string;
    message: {
      conversation?: string;
      audioMessage?: {
        url: string;
        mimetype: string;
        fileSha256: string;
        fileLenght: string;
        seconds: number;
        ptt: boolean;
        mediaKey: string;
        fileEncSha256: string;
        directPath: string;
        mediaKeyTimestamp: string;
        streamingSidecar: string;
        waveform: string;
      };
    };
    contextInfo: {
      expiration: number;
      ephemeralSettingTimestamp: string;
      disappearingMode: {
        initiator: string;
      };
    };
    messageType: messageType;
    messageTimestamp: number;
    instanceId: string;
    source: string;
  };
  destination: string;
  date_time: string;
  sender: string;
  server_url: string;
  apikey: string;
}

export enum messageType {
  audioMessage = 'audioMessage',
  conversation = 'conversation',
}
