import type {
  CreatePlayerSchema,
  PlayerSchema,
  UpdatePlayerSchema,
} from "./__defs__";

const players: Map<number, PlayerSchema> = new Map();

export async function createPlayerService(input: CreatePlayerSchema) {
  const newPlayer = {
    id: players.size + 1,
    ...input,
  };

  players.set(newPlayer.id, newPlayer);

  return newPlayer;
}

export async function getAllPlayersService() {
  const result = Array.from(players.values());

  return result;
}

export async function getPlayerByIdService(id: number) {
  const player = players.get(id);

  return player;
}

export async function deletePlayerById(id: number) {
  players.delete(id);
}

export async function updatePlayerById(id: number, input: UpdatePlayerSchema) {
  const player = players.get(id);

  const newPlayer = {
    ...player!,
    ...input,
  };

  players.set(player!.id, newPlayer);

  return newPlayer;
}
