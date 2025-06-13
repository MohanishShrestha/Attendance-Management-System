import { Router } from "express";
import { applyLeaveController, checkInController, checkOutController, generateExcelReportController, getUserAttendanceController, realAllAttendancesController } from "../controller/attendanceController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";



const attendanceRouter = Router();

attendanceRouter.route("/").get(realAllAttendancesController);
attendanceRouter.route("/checkout").post(isAuthenticated,checkOutController);
attendanceRouter.route("/checkin").post(isAuthenticated,checkInController);
attendanceRouter.route("/leave").post(isAuthenticated,applyLeaveController);
attendanceRouter.route("/:id").get(isAuthenticated,getUserAttendanceController);
attendanceRouter.route("/export/excel").get(isAuthenticated,generateExcelReportController);

export default attendanceRouter;
