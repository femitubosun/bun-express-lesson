import type {
  CreateTeamSchema,
  TeamSchema,
  UpdateTeamSchema,
} from "./__defs__";

const teams: Map<number, TeamSchema> = new Map();

export async function createTeamService(input: CreateTeamSchema) {
  const newTeam = {
    id: teams.size + 1,
    ...input,
  };

  teams.set(newTeam.id, newTeam);

  return newTeam;
}

export async function getAllTeamsService() {
  const result = Array.from(teams.values());

  return result;
}

export async function getTeamByIdService(id: number) {
  const team = teams.get(id);

  return team;
}

export async function deleteTeamById(id: number) {
  teams.delete(id);
}

export async function updateTeamById(id: number, input: UpdateTeamSchema) {
  const team = teams.get(id);

  const newTeam = {
    ...team!,
    ...input,
  };

  teams.set(team!.id, newTeam);

  return newTeam;
}
