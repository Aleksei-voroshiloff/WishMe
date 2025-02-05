import { z } from 'zod';
import { PresentUserShema } from '../../user/types/types';
import { WishObjectSchema } from '../../wish/types/types';

export const PresentObjShema = z.object({
  result: z.array(PresentUserShema),
  wishes: z.array(WishObjectSchema),
});

export const PresentArrShema = z.array(PresentObjShema);

export type PresentObjType = z.infer<typeof PresentObjShema>;
export type PresentArrType = z.infer<typeof PresentArrShema>;
