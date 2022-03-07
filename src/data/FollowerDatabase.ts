import { BaseDatabase } from "./BaseDatabase";

export class FollowerDatabase extends BaseDatabase {
    public async followUser(followerId: string, userToFollowId: string) {
        try {
            await BaseDatabase
                .connection('cookenu_followers')
                .insert({
                    follower_id: followerId,
                    user_to_follow_id: userToFollowId,
                })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async unfollowUser(followerId: string, userToUnfollowId: string){
        try {
            await BaseDatabase
            .connection('cookenu_followers')
            .delete()
            .where({
                follower_id: followerId,
                user_to_follow_id: userToUnfollowId
            })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}