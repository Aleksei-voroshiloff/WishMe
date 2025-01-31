import { z } from 'zod';

export const WishObjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  file: z.string(),
  wishUrl: z.string(),
  price: z.number(),
  wishListId: z.number(),
});
 




export const WishSchema = z.array(WishObjectSchema);

export type WishObjectType = z.infer<typeof WishObjectSchema>;
export type WishTypeArray = z.infer<typeof WishSchema>;

export type UpdatewishForm = {
  wishId: number;
  wishData: Omit<WishObjectType, 'id'>
  ;
};
