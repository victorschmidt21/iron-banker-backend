import { DeepgramVoice } from '@mastra/voice-deepgram';
import { ElevenLabsVoice } from '@mastra/voice-elevenlabs';

export class VoiceDeepgram {
  voice: ElevenLabsVoice;

  constructor() {
    this.voice = new ElevenLabsVoice();
  }

  async transcript(audio) {
    const transcribe = await this.voice.listen(audio);

    return transcribe;
  }
}
