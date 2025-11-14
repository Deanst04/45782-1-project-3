import { AllowNull, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import Vacation from "./Vacation";
import Follow from "./Follow";

@Table({
    underscored: true
})
export default class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(10))
    firstName: string

    @AllowNull(false)
    @Column(DataType.STRING(20))
    lastName: string

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(50))
    email: string

    @AllowNull(false)
    @Column(DataType.STRING(200))
    password: string

    @AllowNull(false)
    @Column(DataType.STRING(10))
    @Default("user")
    role!: "user" | "admin"

    @BelongsToMany(() => Vacation, () => Follow)
    followedVacations: Vacation[]
}