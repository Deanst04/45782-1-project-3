import type Follow from "./follow";
import type Vacation from "./vacation";

export default interface FollowedVacations extends Vacation {
    Follow: Follow
}