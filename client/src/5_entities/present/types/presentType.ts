import { z } from "zod";

export const PresentObjShema = z.object({
    id: z.number(),
    wishId: z.number()
})