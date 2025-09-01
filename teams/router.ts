import { Router, type Request, type Response } from "express";
import {
  createTeamService,
  deleteTeamById,
  getAllTeamsService,
  getTeamByIdService,
  updateTeamById,
} from "./service";

export const teamRouter = Router();

teamRouter.get("", async (_request: Request, response: Response) => {
  const teams = await getAllTeamsService();

  return response.json(teams);
});

teamRouter.post("", async (request: Request, response: Response) => {
  const input = request.body;

  const result = await createTeamService(input);

  return response.json(result);
});

teamRouter.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(400).json({
      message: "Please enter a valid ID Param",
    });
  }

  const team = await getTeamByIdService(Number(id));

  if (!team) {
    return response.status(404).json({
      message: "Player with that ID does not exist",
    });
  }

  return response.json(team);
});

teamRouter.patch("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const input = request.body;

  if (!id) {
    return response.status(400).json({
      message: "Please enter a valid ID Param",
    });
  }

  const team = await getTeamByIdService(Number(id));

  if (!team) {
    return response.status(404).json({
      message: "Team with that ID does not exist",
    });
  }

  const result = await updateTeamById(Number(id), input);

  return response.json(result);
});

teamRouter.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(400).json({
      message: "Please enter a valid ID Param",
    });
  }

  const team = await getTeamByIdService(Number(id));

  if (!team) {
    return response.status(404).json({
      message: "Team with that ID does not exist",
    });
  }

  await deleteTeamById(team.id);

  return response.status(204).json({
    message: "Deleted successfully",
  });
});
