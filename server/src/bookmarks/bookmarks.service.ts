import mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';
import { Bookmark } from './schema/bookmark.schema';
import { List } from 'src/list/schema/list.schema';


@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark.name)
    private bookmarkModel: mongoose.Model<Bookmark>,

    
    
  ) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    const bookmark = new this.bookmarkModel(createBookmarkDto);
    // the attribute 'list' is a the list id, use it to find the list
    // update the list's bookmark count
    // const list = createBookmarkDto.list;
    // console.log(list);
    // list.bookmarks += 1;
    // await list.save();
    return bookmark.save();
  }

  async findAllForUser(id: string): Promise<Bookmark[]> {
    const isValidObjectId = mongoose.isValidObjectId(id);
    if (!isValidObjectId) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const bookmarks = await this.bookmarkModel.find({ user: id });
    if (!bookmarks) {
      throw new NotFoundException('No bookmarks found');
    }
    return bookmarks;
  }

  async findOne(id: string, listId: string) {
    const isValidObjectId = mongoose.isValidObjectId(id);
    if (!isValidObjectId) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const isValidListId = mongoose.isValidObjectId(id);
    if (!isValidListId) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const bookmark = await this.bookmarkModel.findOne({ user: id, list: listId });
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return bookmark;
  }


  async remove(id: string, listId: string) {
    const isValidObjectId = mongoose.isValidObjectId(id);
    if (!isValidObjectId) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const isValidListId = mongoose.isValidObjectId(id);
    if (!isValidListId) {
      throw new NotFoundException('Invalid ObjectId');
    }

    const deletedBookmark = await this.bookmarkModel.findOneAndDelete({ user: id, list: listId });
    if (!deletedBookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return deletedBookmark;
    
  }
}
