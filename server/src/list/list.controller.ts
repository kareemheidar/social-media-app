import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { List } from './schema/list.schema';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create_list.dto';
import { UpdateListDto } from './dto/update_list.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  async getAllLists(@Query() query: ExpressQuery): Promise<List[]> {
    const lists = await this.listService.findAll(query);
    return lists;
  }

  @Post()
  @UseGuards(AuthGuard())
  async createList(
    @Body()
    list: CreateListDto,
    @Req() req,
  ): Promise<List> {
    return this.listService.create(list, req.user);
  }

  @Get(':id')
  async getList(
    @Param('id')
    id: string,
  ): Promise<List> {
    const lists = await this.listService.findById(id);
    return lists;
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateList(
    @Param('id')
    id: string,
    @Body()
    list: UpdateListDto,
  ): Promise<List> {
    return this.listService.updateById(id, list);
  }

  @Put(':id/increment')
  async incrementBookmarkCount(
    @Param('id')
    id: string,
  ): Promise<List> {
    return this.listService.incrementBookmarkCount(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteList(
    @Param('id')
    id: string,
  ): Promise<List> {
    return this.listService.deleteById(id);
  }
}
