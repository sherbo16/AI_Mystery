export function errorMiddleware(error, req, res, next) {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({
    success: false,
    message: error.status ? error.message : 'Unexpected server error',
    error: { code: error.code || 'INTERNAL_ERROR' },
  });
}
