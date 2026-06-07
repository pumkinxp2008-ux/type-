import { Request, Response } from "express";
import { users } from "../data/store";
import { User } from "../types/user";

// /sign
export const sign = (req: Request, res: Response) => {
  const { name } = req.body;

  const exists = users.find(u => u.name === name);
  if (exists) {
    return res.status(400).json({ error: "Name already exists" });
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    pets: [],
    colors: []
  };

  users.push(newUser);

  res.json({ id: newUser.id });
};

// /check
export const check = (req: Request, res: Response) => {
  const { name } = req.body;

  const user = users.find(u => u.name === name);
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ id: user.id });
};

// /create
export const create = (req: Request, res: Response) => {
  const { name, surname } = req.body;

  let user = users.find(u => u.name === name);

  if (user) {
    user.surname = surname;
  } else {
    user = {
      id: users.length + 1,
      name,
      surname,
      pets: [],
      colors: []
    };
    users.push(user);
  }

  res.json(user);
};

// /pet
export const pet = (req: Request, res: Response) => {
  const { id, pet } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.pets.push(pet);

  res.json(user);
};

// /colors
export const colors = (req: Request, res: Response) => {
  const { id, colors } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.colors.push(...colors);

  res.json(user);
};