import { atom } from "recoil";

interface IToDoStage {
  [key: string]: string[];
}

export const toDoState = atom<IToDoStage>({
  key: "toDo",
  default: {
    "To Do": ["Cycling", "Dancing", "Reading"],
    "In Progress": ["Studying", ],
    "Done": ["Sleeping", "Running", ],
  },
});