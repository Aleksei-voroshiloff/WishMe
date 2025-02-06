import type { DebouncedFuncLeading } from 'lodash';
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

export type useFriendType = {
  throttledAddFriend: DebouncedFuncLeading<(friendId: number) => void>;
  deleteFriend: (friendId: number, name: string) => void;
  cancelRequest: (friendId: number, name: string) => void;
  acceptRequest: (friendId: number) => void;
  rejectRequest: (friendId: number) => void;
};

export const receivesToFriendSchema = z.array(receiveToFriendSchema);
export const receivefriendsSchema = z.array(receiveFriendSchema);
export const friendsSchema = z.array(oneFriendSchema);

export type OneFriendType = z.infer<typeof oneFriendSchema>;
export type FriendsType = z.infer<typeof friendsSchema>;
