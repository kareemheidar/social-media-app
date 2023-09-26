import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { List } from "src/list/schema/list.schema";

@Schema({
    timestamps: true,
  })
export class Bookmark extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List' })
    list: List;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);