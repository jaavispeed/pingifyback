import { Body, Controller, Post} from '@nestjs/common';
import { AiService } from './ai.service';
import { aiDto } from './dto/ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}


  @Post('mejorar-texto')
  async mejorarTexto(@Body() aidto: aiDto) {

    return this.aiService.mejorarTexto(aidto)
  }

}
