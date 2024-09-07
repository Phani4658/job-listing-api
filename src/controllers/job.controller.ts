import { Request, Response } from "express";
import * as service from "../services/job.service";
import { TUser } from "../types";

interface CustomRequest extends Request {
  user?: TUser;
}

export const addJob = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const job = await service.createJob(body);
    console.log(job);
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const job = await service.getJob(jobId);
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const modifyJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const { body } = req;
    const job = await service.updateJob(jobId, body);
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    await service.deleteJob(jobId);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const listJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await service.listJobs();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const applyJob = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const jobId = req.params.jobId;
    if (!userId || !jobId) {
      return res.status(400).send("Missing user or job ID");
    }
    await service.applyJob(userId, jobId);
    res.status(200).send("Applied job successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
