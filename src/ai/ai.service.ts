import { Injectable } from '@nestjs/common';
import { aiDto } from './dto/ai.dto';
import { aiCheckUseCase } from './use-case/ai.use-case';
import OpenAI from 'openai';


@Injectable()
export class AiService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })


  async mejorarTexto(aidto: aiDto) {
    return await aiCheckUseCase(
      this.openai, {
      prompt: aidto.prompt
    });
  }

}