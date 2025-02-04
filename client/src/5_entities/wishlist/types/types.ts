import { z } from 'zod';

export const WishListObjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.string(),
  userId: z.number().optional(),
});
 




export const WishListSchema = z.array(WishListObjectSchema);

export type WishListObjectType = z.infer<typeof WishListObjectSchema>;
export type WishListTypeArray = z.infer<typeof WishListSchema>;

export type UpdatewishListForm = {
  wishListId: number;
  wishListData: Omit<WishListObjectType, 'id'>
  ;
};
