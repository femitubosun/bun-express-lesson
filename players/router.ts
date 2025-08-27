import { Router, type Request, type Response } from "express";
import {
  createPlayerService,
  deletePlayerById,
  getAllPlayersService,
  getPlayerByIdService,
  updatePlayerById,
} from "./service";

export const playerRouter = Router();

/**
 * C - Create
 * R - Retrieve | Retrieve 1, Retrieve All
 * U - Update
 * D - Destroy
 *
 *
 *  Resource Endpoints
 *  Retrieve all - /players  {GET}
 *  Retrieve one - /players/{id} {GET}
 *  Create       - /players  {POST}
 *  Update       - /players/{id} {PATCH|PUT}
 *  Destroy      - /players/{id}  {DELETE}
 */

// Retrieve All endpoint
playerRouter.get("", async (_request: Request, response: Response) => {
  const players = await getAllPlayersService();

  return response.json(players);
});

// Create
playerRouter.post("", async (request: Request, response: Response) => {
  const input = request.body;

  const result = await createPlayerService(input);

  return response.json(result);
});

// Retrieve ONE
playerRouter.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(400).json({
      message: "Please enter a valid ID Param",
    });
  }

  const player = await getPlayerByIdService(Number(id));

  if (!player) {
    return response.status(404).json({
      message: "Player with that ID does not exist",
    });
  }

  return response.json(player);
});

// Update ONE
playerRouter.patch("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const input = request.body;

  if (!id) {
    return response.status(400).json({
      message: "Please enter a valid ID Param",
    });
  }

  const player = await getPlayerByIdService(Number(id));

  if (!player) {
    return response.status(404).json({
      message: "Player with that ID does not exist",
    });
  }

  const result = await updatePlayerById(Number(id), input);

  return response.json(result);
});

// Destroy ONE
playerRouter.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(400).json({
      message: "Please enter a valid ID Param",
    });
  }

  const player = await getPlayerByIdService(Number(id));

  if (!player) {
    return response.status(404).json({
      message: "Player with that ID does not exist",
    });
  }

  await deletePlayerById(player.id);

  return response.status(204).json({
    message: "Deleted successfully",
  });
});
