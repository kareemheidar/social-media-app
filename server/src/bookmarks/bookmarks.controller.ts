import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { Bookmark } from './schema/bookmark.schema';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {

    return this.bookmarksService.create(createBookmarkDto);
  }

  @Get()
  findAll() {
    return "hello world";
  }


  // get all bookmarks for a user
  @Get('user/:id')
  async findAllForUser(@Param('id') id: string): Promise<Bookmark[]> {
    const bookmarks = await this.bookmarksService.findAllForUser(id);
    return bookmarks;
  }

  // get a bookmark by the list id and user id
  @Get('user/:id/list/:listId')
  async findOne(@Param('id') id: string, @Param('listId') listId: string): Promise<Bookmark> {
    const bookmark = await this.bookmarksService.findOne(id, listId);
    return bookmark;
  }

  @Delete('user/:id/list/:listId')
  async remove(@Param('id') id: string, @Param('listId') listId: string) {
    return this.bookmarksService.remove(id, listId);
  }
}
