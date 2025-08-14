

export const submitLeaveForm = (req, res) => {
    try {
        const { employeeName, leaveType, startDate, endDate, reason } = req.body;
        let documentFile = null;

        if (req.file) {
            documentFile = req.file.filename; // saved file name
        }

        res.status(201).json({
            message: "Leave form submitted successfully",
            data: {
                employeeName,
                leaveType,
                startDate,
                endDate,
                reason,
                document: documentFile
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error submitting leave form", error: error.message });
    }
};
