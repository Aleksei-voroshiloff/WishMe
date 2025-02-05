import { z } from 'zod';

export const oneFriendSchema = z.object({
  id: z.number(),
  name: z.string(),
  birthday: z.string().nullable(),
  avatar: z.string().nullable(),
});

export const receiveFriendSchema = z.object({
  Receiver: oneFriendSchema,
});

export const receiveToFriendSchema = z.object({
  Requester: oneFriendSchema,
});


export const receivesToFriendSchema = z.array(receiveToFriendSchema)
export const receivefriendsSchema = z.array(receiveFriendSchema);
export const friendsSchema = z.array(oneFriendSchema)

export type OneFriendType = z.infer<typeof oneFriendSchema>;
export type FriendsType = z.infer<typeof friendsSchema>;
