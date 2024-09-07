import { Job } from "../models/job.model";
import { TJob } from "../types/job.type";

export const createJob = async (jobDetails: TJob) => {
  const job = await Job.create(jobDetails);
  console.log(job);
  return job;
};

export const getJob = async (jobId: string) => {
  const job = await Job.findById(jobId).populate({
    path: "applied_users",
    select: "name",
  });
  if (!job) {
    throw new Error("Job not found");
  }
  return job;
};

export const updateJob = (jobId: string, details: any) => {
  const job = Job.findByIdAndUpdate(jobId, details, { new: true });
  if (!job) {
    throw new Error("Job not found");
  }
  return job;
};

export const deleteJob = async (jobId: string) => {
  const job = await Job.findByIdAndDelete(jobId);
  if (!job) {
    throw new Error("Job not found");
  }
};

export const listJobs = async () => {
  const jobs = await Job.find({})
    .populate({
      path: "applied_users",
      select: "name",
    })
    .exec();

  return jobs;
};

export const applyJob = async (userId: string, jobId: string) => {
  const user = await Job.findByIdAndUpdate(
    jobId,
    { $push: { applied_users: userId } },
    { new: true }
  );
  if (!user) {
    throw new Error("User not found");
  }
};
