import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwegger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
