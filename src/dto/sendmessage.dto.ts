export interface sendMessageDto {
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
            conversation: string;
        };
        contextInfo: {
            expiration: number;
            ephemeralSettingTimestamp: string;
            disappearingMode: {
                initiator: string;
            };
        };
        messageType: string;
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