import mongoose from 'mongoose';
import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schema/list.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';
@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name)
    private listModel: mongoose.Model<List>,
    private authService: AuthService,
    @Inject(forwardRef(() => BookmarksService))
    private bookmarksService: BookmarksService
  ) {}

  async findAll(query: Query): Promise<List[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const lists = await this.listModel.find({ ...keyword });
    return lists;
  }
  async create(list: List, user: User): Promise<List> {
    const data = Object.assign(list, {user: user._id})
    const userObj = await this.authService.getUser(user._id);
    data.firstName = userObj.firstname;
    data.lastName = userObj.lastname;
    data.bookmarks = 0;
    data.likes = 0;
    const res = await this.listModel.create(list);
    
    return res;
  }

  async findById(id: string): Promise<List> {
    const list = await this.listModel.findById(id);

    if (!list) {
      throw new NotFoundException('List not found.');
    }

    return list;
  }

  async incrementBookmarkCount(id: string): Promise<List> {
    const list = await this.listModel.findById(id);

    if (!list) {
      throw new NotFoundException('List not found.');
    }
    if(list.bookmarks === undefined) {
      list.bookmarks = 0;
    }
    list.bookmarks += 1;
    return await list.save();
  }

  async updateById(id: string, list: List): Promise<List> {
    return await this.listModel.findByIdAndUpdate(id, list, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<List> {
    return await this.listModel.findByIdAndDelete(id);
  }

  async getAllListsForUser(id: string): Promise<List[]> {
    // get all the bookmarks
    const bookmarks = await this.bookmarksService.findAllForUser(id);
    const lists = await this.listModel.find();
    const savedLists = [];
    bookmarks.forEach(bookmark => {
      const list = lists.find(list => list._id.toString() === bookmark.list.toString());
      if(list) {
        list.isBookmarked = true;
        list.save();
        savedLists.push(list);
      }
    })

    return savedLists;
  }
}
