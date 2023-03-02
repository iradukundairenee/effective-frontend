import moment from "moment";
export const initialState = {
  name: "",
  type: "",
  nOfItems: "1",
  startDate: moment().format("YYYY-MM-DD"),
  dueDate: moment().format("YYYY-MM-DD"),
  budget: "",
  status: "pending",
  description: "",
  userId: "",
  managerId: "",
};
export const projectStatuses = ["pending", "approved", "canceled"];
export const projectTypes = [
  {
    name: "Cube Platform",
    description: "I want to publish and manage my products in 3D and AR myself",
  },
  {
    name: "3D modeling",
    description: "I need help with creating my products in 3D",
  },
  {
    name: "3D Viewer",
    description: "I want to present my product in 3D on a website",
  },
  {
    name: "3D Configurator",
    description: "I want to showcase my products in specific configurations",
  },
  { name: "AR", description: "I want to showcase my products in AR" },
];

export const projectBudgets = ["0-10k", "10k-50k", "50k+"];
