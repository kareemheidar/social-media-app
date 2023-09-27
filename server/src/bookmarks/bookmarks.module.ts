import { Module, forwardRef } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from './schema/bookmark.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ListModule } from 'src/list/list.module';
import { ListService } from 'src/list/list.service';
import { ListController } from 'src/list/list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
    AuthModule,
    forwardRef(() => ListModule)
  ],

  controllers: [BookmarksController],
  providers: [BookmarksService],
  exports: [BookmarksService]
})
export class BookmarksModule {}
