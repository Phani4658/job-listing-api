import { Router } from "express";
import * as controller from "../controllers/job.controller";


export const job = Router();

job.get('/', controller.listJobs);
job.post("/", controller.addJob);
job.get("/:jobId", controller.getJob);
job.put("/:jobId", controller.modifyJob);
job.delete("/:jobId", controller.deleteJob);
job.post("/:jobId/apply", controller.applyJob);