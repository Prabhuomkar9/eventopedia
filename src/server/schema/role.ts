import { z } from 'zod';


const promotionSchema = z.object({
  userId: z.string(),
});

const demotionSchema = z.object({
  userId: z.string(),
});


export {
  promotionSchema,
  demotionSchema
}
