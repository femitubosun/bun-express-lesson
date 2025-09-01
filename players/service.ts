import { db } from "../db";
import type { CreatePlayerSchema, UpdatePlayerSchema } from "./__defs__";

export async function createPlayerService(input: CreatePlayerSchema) {
  /**
   *
   * input = {
   * name: "Neymar"
   * jerseyNumber: 10,
   * position: Forward
   * value: 2000000
   * }
   *
   *
   */

  const newPlayer = await db.player.create({
    data: {
      name: input.name,
      jerseyNumber: input.jerseyNumber,
      postition: input.position,
      value: input.value,
    },
  });

  return newPlayer;
}

export async function getAllPlayersService() {
  const result = await db.player.findMany();

  return result;
}

export async function getPlayerByIdService(id: number) {
  const player = await db.player.findUnique({
    where: {
      id: id,
    },
  });

  return player;
}

export async function deletePlayerById(id: number) {
  await db.player.delete({
    where: {
      id: id,
    },
  });
}

export async function updatePlayerById(id: number, input: UpdatePlayerSchema) {
  const player = await db.player.update({
    where: {
      id: id,
    },
    data: input,
  });

  return player;
}
