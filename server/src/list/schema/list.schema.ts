import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum Category {
  COOKING = 'Cooking',
  SPORTS = 'Sports',
  FINANCE = 'Finance',
  FICTION = 'Fiction',
  ENTERTAINMENT = 'Entertainment',
}

export interface ListItem {
  name: string;
  subpoints: string[];
}

@Schema({
  timestamps: true,
})
export class List {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  topic: string;

  @Prop()
  category: Category;

  @Prop()
  items: ListItem[];

  @Prop()
  visibility: 'public' | 'private';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ListSchema = SchemaFactory.createForClass(List);
