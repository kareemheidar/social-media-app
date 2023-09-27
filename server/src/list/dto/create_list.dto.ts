import { Category, ListItem } from '../schema/list.schema';
import { User } from 'src/auth/schemas/user.schema';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly topic: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @IsNotEmpty()
  readonly items: ListItem[];

  @IsNotEmpty()
  @IsString()
  readonly visibility: 'public' | 'private';

  @IsOptional()
  bookmarks: number;

  @IsOptional()
  likes: number;

  @IsNotEmpty()
  readonly user: User;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  isBookmarked: boolean;

  @IsOptional()
  isLiked: boolean;
}
