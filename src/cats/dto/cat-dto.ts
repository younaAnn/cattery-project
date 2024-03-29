import {
  IsBoolean,
  IsDateString,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsEnum(['male', 'female'])
  gender: string;

  @IsString()
  breederUsername: string;

  @IsString()
  ownerUsername: string;

  @IsNumberString()
  @IsOptional()
  motherId?: string;

  @IsNumberString()
  @IsOptional()
  fatherId?: string;

  @IsString()
  breedName: string;

  @IsString()
  color: string;

  @IsDateString()
  birthDate: Date;

  @IsBoolean()
  @IsOptional()
  abilityToReproduce: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isAlive: boolean;
}

export class UpdateCatDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsEnum(['male', 'female'])
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  ownerUsername?: string;

  @IsNumberString()
  @IsOptional()
  motherId?: string;

  @IsNumberString()
  @IsOptional()
  fatherId?: string;

  @IsString()
  @IsOptional()
  breedName?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsBoolean()
  @IsOptional()
  abilityToReproduce?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isAlive?: boolean;

  @IsEmpty()
  isDeleted?: boolean;

  @IsEmpty()
  deletionDate?: string;
}

export const catFieldsForUpdate = [
  'name',
  'title',
  'gender',
  'color',
  'birthDate',
  'abilityToReproduce',
  'description',
  'isAlive',
  'isDeleted',
  'deletionDate',
];
