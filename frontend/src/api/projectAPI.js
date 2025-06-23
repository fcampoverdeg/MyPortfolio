// frontend/src/api/data.js

/**
Axios-based functions that call the backend routes from the frontend.
*/

import axios from "./axios";

// ============== Get Project ============== //
export const getProjects = async () => {
  const res = await axios.get("/Home");
  return res.data.data;
};

// ============== Create Project ============== //
export const createProject = async (project) => {
  const res = await axios.post("/Home", project);
  return res.data.data;
};

// ============== Update Project ============== //
export const updateProject = async (id, updatedData) => {
  const res = await axios.put(`/Home/${id}`, updatedData);
  return res.data.data;
};

// ============== Delete Project ============== //
export const deleteProject = async (id) => {
  const res = await axios.delete(`/Home/${id}`);
  return res.data.data;
};
