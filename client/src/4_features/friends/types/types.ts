import {z} from 'zod';


export const oneFriendSchema = z.object({
  id: z.number(),
  name: z.string(),
  birthday: z.date(),
  avatar: z.string(),
})

export const friendsSchema = z.array(oneFriendSchema)

export type OneFriendType = z.infer<typeof oneFriendSchema>
export type FriendsType = z.infer<typeof friendsSchema>