import express from "express";

const router = express.Router()

import { createJob, updateJob, getAllJobs, deleteJob, showStats } from '../contollers/jobsController.js'

router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router