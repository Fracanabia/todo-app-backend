import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwegger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
