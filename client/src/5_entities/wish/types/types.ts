import { z } from 'zod';

export const WishObjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  file: z.string(),
  wishUrl: z.string(),
  price: z.string(),
  wishListId: z.number(),
});

export const PresentObjShema = z.object({
  id: z.number(),
  wishId: z.number(),
  userId: z.number(),
})

export type PresentObjType = z.infer<typeof PresentObjShema>



export const WishSchema = z.array(WishObjectSchema);

export type WishObjectType = z.infer<typeof WishObjectSchema>;
export type WishTypeArray = z.infer<typeof WishSchema>;

export type UpdatewishForm = {
  wishId: number;
  wishData: Omit<WishObjectType, 'id'>;
};
