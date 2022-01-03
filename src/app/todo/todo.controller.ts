import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwegger } from 'src/helpers/swegger/bad-request-swegger';
import { NotFoundSwegger } from 'src/helpers/swegger/not-found-swegger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoSwegger } from './swegger/create-todo-swegger';
import { IndexTodoSwegger } from './swegger/index-todo-swegger';
import { ShowTodoSwegger } from './swegger/show-todo-swegger';
import { UpdateTodoSwegger } from './swegger/update-todo-swegger';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as tarefas',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tarefas retornada com sucesso',
    type: IndexTodoSwegger,
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar uma nova tarefa',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Nova tarefa criada com sucesso',
    type: CreateTodoSwegger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parametros inválidos',
    type: BadRequestSwegger,
  })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Exibir os dados de uma tarefa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dados de uma tarefa retornado com sucesso',
    type: ShowTodoSwegger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A tarefa não foi encontrada',
    type: NotFoundSwegger,
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar os dados de uma tarefa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarefa atualizada com sucesso',
    type: UpdateTodoSwegger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parametros inválidos',
    type: BadRequestSwegger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A tarefa não foi encontrada',
    type: NotFoundSwegger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma tarefa',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tarefa removida com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'A tarefa não foi encontrada',
    type: NotFoundSwegger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.todoService.deleteById(id);
  }
}
