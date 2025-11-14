import { AllowNull, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import User from "./User";
import Follow from "./Follow";

@Table({
    underscored: true
})
export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(40))
    destination: string

    @AllowNull(false)
    @Column(DataType.STRING(300))
    description: string

    @AllowNull(false)
    @Column(DataType.DATE)
    startDate: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    endDate: Date

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price: number

    @AllowNull(false)
    @Column(DataType.STRING)
    imageUrl: string

    @BelongsToMany(() => User, () => Follow, 'vacationId', 'userId')
    followers: User[]
}