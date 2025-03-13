import { z } from "zod";
import { NextResponse } from "next/server";

export function validateRequest<T>(schema: z.Schema<T>, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = Object.entries(result.error.flatten().fieldErrors)
      .flatMap(([field, messages]) =>
        (messages as string[])?.map((msg) => `${field}: ${msg}`) || []
      );

    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  return result.data; // Return validated data
}
