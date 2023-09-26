import mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schema/list.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name)
    private listModel: mongoose.Model<List>,
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
}
