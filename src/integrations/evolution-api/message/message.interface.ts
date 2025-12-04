export interface MessageSendRequest {
  number: string;
  options?: {
    delay?: number;
    presence?: string;
    linkPreview?: boolean;
    quoted?: {
      key: {
        remoteJid: string;
        fromMe: boolean;
        id: string;
        participant: string;
      };
      message: {
        conversation: string;
      };
    };
    mentions?: {
      everyOne?: boolean;
      mentioned?: string[];
    };
  };
  text: string;
}
