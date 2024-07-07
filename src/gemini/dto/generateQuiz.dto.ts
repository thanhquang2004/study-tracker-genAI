export class GenerateQuizDto {
  Name: string;
  Description: string;
  Resources: string[];
}

export class Dto {
  id: string;
  stage: string;
  generateQuizDto: GenerateQuizDto;
}
