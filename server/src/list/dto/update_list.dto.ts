import { User } from 'src/auth/schemas/user.schema';
import { Category, ListItem } from '../schema/list.schema';
import { IsOptional, IsString, IsEmpty, IsEnum } from 'class-validator';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly topic: string;

  @IsOptional()
  @IsEnum({ message: 'choose a category' })
  readonly category: Category;

  @IsOptional()
  readonly items: ListItem[];

  @IsOptional()
  @IsString()
  readonly visibility: 'public' | 'private';

  @IsOptional()
  bookmarks: number;

  @IsOptional()
  likes: number;

  @IsEmpty({ message: ' You cannot pass user id ' })
  readonly user: User;
}
