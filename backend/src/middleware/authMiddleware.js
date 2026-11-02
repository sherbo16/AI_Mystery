import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const user = await User.findOneAndUpdate(
      { email: 'anonymous@ai-mystery-room.local' },
      { $setOnInsert: { name: 'Anonymous Detective', email: 'anonymous@ai-mystery-room.local', passwordHash: 'anonymous-workspace' } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).select('_id name email');
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
