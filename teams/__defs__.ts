import z from "zod";

export const TeamNameSchema = z.enum([
  "Barcelona",
  "Real Madrid",
  "Liverpool",
  "Chelsea",
  "Inter-Milan",
]);

export const TeamSchema = z.object({
  id: z.number(),
  NumberOnTable: z.number(),
  team: TeamNameSchema,
  value: z.number(),
});

export const CreateTeamSchema = TeamSchema.omit({
  id: true,
});

export const UpdateTeamSchema = CreateTeamSchema.partial();

export type TeamSchema = z.infer<typeof TeamSchema>;
export type CreateTeamSchema = z.infer<typeof CreateTeamSchema>;
export type UpdateTeamSchema = z.infer<typeof UpdateTeamSchema>;
