import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GenerateQuesDto } from './dto/generate-ques.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from '@prisma/client';
import { GenerateQuizDto } from './dto/generateQuiz.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('question1')
  async generateQuestion1(@Body() generateQuesDto: GenerateQuesDto) {
    return this.geminiService.generateQuestion1(generateQuesDto.info);
  }

  @Post('question2')
  async generateQuestion2(@Body() generateQuesDto: GenerateQuesDto) {
    return this.geminiService.generateQuestion2(generateQuesDto.info);
  }

  @Post('question3')
  async generateQuestion3(@Body() generateQuesDto: GenerateQuesDto) {
    return this.geminiService.generateQuestion3(generateQuesDto.info);
  }

  @Post('roadmap')
  @UseGuards(JwtAuthGuard)
  async generateRoadmap(
    @CurrentUser() user: User,
    @Body() generateQuesDto: GenerateQuesDto,
  ) {
    return this.geminiService.generateRoadmap(
      user,
      generateQuesDto.info,
      'title',
    );
  }

  @Post('quiz')
  async generateQuiz(@Body() generateQuizDto: GenerateQuizDto) {
    return this.geminiService.generateQuiz(generateQuizDto);
  }

  @Get('roadmap/:id')
  @UseGuards(JwtAuthGuard)
  async getRoadmap(@Param('id') id: string) {
    return this.geminiService.getRoadmap(id);
  }
}
