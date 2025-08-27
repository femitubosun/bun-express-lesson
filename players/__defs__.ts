import z from "zod";

export const PlayerPositionSchema = z.enum([
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
]);

export const PlayerSchema = z.object({
  id: z.number(),

  name: z.string(),

  jerseyNumber: z.number(),

  position: PlayerPositionSchema,

  value: z.number(),
});

export const CreatePlayerSchema = PlayerSchema.omit({
  id: true,
});

export const UpdatePlayerSchema = CreatePlayerSchema.partial();

export type PlayerSchema = z.infer<typeof PlayerSchema>;
export type CreatePlayerSchema = z.infer<typeof CreatePlayerSchema>;
export type UpdatePlayerSchema = z.infer<typeof UpdatePlayerSchema>;
