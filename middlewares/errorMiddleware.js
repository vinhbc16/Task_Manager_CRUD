const notFound = (req, res, next) => {
    // Tạo một đối tượng lỗi mới
    const error = new Error(`Path not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};


const errorHandler = (error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || "An unknown error occurred" });
}

module.exports = { notFound, errorHandler };