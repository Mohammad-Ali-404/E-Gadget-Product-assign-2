// order zod validation

import { z } from "zod";

const ordersValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default ordersValidationSchema;
