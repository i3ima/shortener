import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";


@ObjectType()
@Entity()
export class Url {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  // @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
 
  @Field()
  @Property({type: "text", unique: true, })
  url!: string
  
  @Field()
  @Property({type: "text", unique: true, })
  short!: string
}