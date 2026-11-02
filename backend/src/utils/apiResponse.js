export const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });
export const fail = (res, message, status = 400, code = 'BAD_REQUEST') =>
  res.status(status).json({ success: false, message, error: { code } });
