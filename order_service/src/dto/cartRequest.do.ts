import { Static, Type } from "@sinclair/typebox";

export const CartRequestSchema = Type.Object({
    productId: Type.Integer(),
    qty: Type.Integer()
});


export type CartRequestInput = Static<typeof CartRequestSchema>;

