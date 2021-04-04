import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from '../../cats/entities/cat.entity';
import { Advertisement } from '../../advertisements/entities/advertisement.entity';
import { Exclude } from 'class-transformer';
import { Cattery } from '../../catteries/entities/cattery.entity';
import { UserInCattery } from '../../catteries/entities/user-in-cattery.entity';
import { ApplicationToCattery } from '../../catteries/entities/application-to-cattery.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  @Exclude()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({})
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({})
  lastName: string;

  @Column({})
  birthDate: Date;

  @Column({ default: new Date() })
  registrationDate: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ default: 'default' })
  image: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ nullable: true })
  deletionDate: Date;

  @OneToMany(() => Cat, (cat) => cat.breeder, { nullable: true })
  bredCats: Cat[];

  @OneToMany(() => Cat, (cat) => cat.breeder, { nullable: true })
  ownedCats: Cat[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.creator, {
    nullable: true,
  })
  createdAdvertisements: Advertisement[];

  @OneToMany(() => Cattery, (cattery) => cattery.leader, {
    nullable: true,
  })
  leadCatteries: Cattery[];

  @OneToMany(() => UserInCattery, (userInCattery) => userInCattery.user, {
    nullable: true,
  })
  catteries: UserInCattery[];

  @OneToMany(
    () => ApplicationToCattery,
    (applicationToCattery) => applicationToCattery.user,
    {
      nullable: true,
    },
  )
  applications: ApplicationToCattery[];
}
