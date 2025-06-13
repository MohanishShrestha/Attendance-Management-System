import expressAsyncHandler from "express-async-handler";
import Attendance from "../Schema/AttendanceSchema.js";

import ExcelJS from "exceljs";




export const checkInController = expressAsyncHandler(async (req, res,next) => {
  const userId = req.user?.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await Attendance.findOne({ user: userId, date: today });
  if (existing) {
    return res.status(400).json({ message: "Already checked in today." });
  }

  const attendance = new Attendance({
    user: userId,
    date: today,
    checkIn: new Date().toLocaleTimeString(),
  });

  const result = await attendance.save();

  res.status(201).json({
    success: true,
    message: "Check-in successful",
    result,
  });
});

  

export const checkOutController = expressAsyncHandler(async (req, res,next) => {
  const userId = req.user?.id;

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find today's attendance record
  const attendance = await Attendance.findOne({ user: userId, date: today });

  if (!attendance) {
    return res
      .status(404)
      .json({ message: "No check-in record found for today." });
  }

  if (attendance.checkOut) {
    return res.status(400).json({ message: "Already checked out today." });
  }

  attendance.checkOut = now.toLocaleTimeString(); // Convert to string
  await attendance.save();

  res.status(200).json({
    success: true,
    message: "Check-out successful",
    result: attendance,
  });
});

  
export const applyLeaveController = expressAsyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { date } = req.body;

  // if (!userId) {
  //   return res.status(401).json({ message: "Unauthorized. Please log in." });
  // }

  if (!date) {
    return res.status(400).json({ message: "Leave date is required." });
  }

  const leaveDate = new Date(date);
  leaveDate.setHours(0, 0, 0, 0); // normalize to midnight

  // Check if record already exists
  const existing = await Attendance.findOne({ user: userId, date: leaveDate });

  if (existing) {
    return res.status(400).json({ message: "Already marked for this date." });
  }

  const leave = new Attendance({
    user: userId,
    date: leaveDate,
    status: "Leave",
  });

  const result = await leave.save();

  res.status(201).json({
    success: true,
    message: "Leave applied successfully.",
    result,
  });
});



export const getUserAttendanceController = expressAsyncHandler(
  async (req, res) => {
    const userId = req.params.id; 

  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const records = await Attendance.find({ user: userId })
      .sort({ date: -1 }) // Sort by newest date first
      .populate("user", "name email"); // Populate user info if needed

    res.status(200).json({
      success: true,
      count: records.length,
      records,
    });
  }
);


export const generateExcelReportController = expressAsyncHandler(
  async (req, res) => {
    const data = await Attendance.find().populate("user", "name email"); // get all attendance with user details

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance Report");

    // Define worksheet headers
    worksheet.columns = [
      { header: "S.No", key: "sno", width: 6 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Check In", key: "checkIn", width: 15 },
      { header: "Check Out", key: "checkOut", width: 15 },
      { header: "Status", key: "status", width: 12 },
    ];

    // Fill data rows
    data.forEach((entry, index) => {
      worksheet.addRow({
        sno: index + 1,
        name: entry.user?.name || "N/A",
        email: entry.user?.email || "N/A",
        date: new Date(entry.date).toLocaleDateString(),
        checkIn: entry.checkIn || "-",
        checkOut: entry.checkOut || "-",
        status: entry.status || "Present",
      });
    });

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance-report.xlsx"
    );

    // Write file to response
    await workbook.xlsx.write(res);
    res.end();
  }
);


export const realAllAttendancesController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Attendance.find({});
    console.log(result)
    res.status(200).json({
      sucess: true,
      message: "all user read successfully",
      result: result,
    });
  }
);

export const readSpecificAttendancesController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Attendance.findById(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "read successfully",
      result: result,
    });
  }
);

export const updateSpecificAttendancesController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await Attendance.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
      sucess: true,
      message: "read successfully",
      result: result,
    });
  }
);

export const deleteSpecificAttendancesController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "delete successfully",
      result: result,
    });
  }
);
