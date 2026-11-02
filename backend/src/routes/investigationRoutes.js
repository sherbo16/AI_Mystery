import { Router } from 'express';
import { z } from 'zod';
import Investigation from '../models/Investigation.js';
import Note from '../models/Note.js';
import Accusation from '../models/Accusation.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { generateInvestigation } from '../services/mysteryGenerator.js';
import { generateCaseId } from '../utils/generateCaseId.js';
import { ok, fail } from '../utils/apiResponse.js';

const router = Router();
const inputSchema = z.object({
  title: z.string().trim().max(120).optional(),
  scenario: z.string().trim().min(30).max(3000),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  category: z.enum(['THEFT', 'MISSING_PERSON', 'CYBER_MYSTERY', 'GENERAL_MYSTERY']),
  suspectCount: z.number().int().min(3).max(6),
  evidenceAmount: z.enum(['STANDARD', 'EXTENDED']),
});
const owned = async (id, userId) => Investigation.findOne({ _id: id, userId });

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const input = inputSchema.parse(req.body);
    const investigation = await Investigation.create({ userId: req.user._id, caseId: generateCaseId(), ...input });
    generateInvestigation(investigation, input);
    ok(res, { investigation: { id: investigation._id, caseId: investigation.caseId, status: investigation.status } }, 202);
  } catch (error) { next(error); }
});
router.get('/', requireAuth, async (req, res, next) => {
  try { ok(res, { investigations: await Investigation.find({ userId: req.user._id }).select('-blueprint -timeline').sort('-createdAt') }); } catch (error) { next(error); }
});
router.get('/:id/status', requireAuth, async (req, res, next) => {
  try { const item = await owned(req.params.id, req.user._id).select('status generationStatus'); if (!item) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); ok(res, { status: item.status, generationStatus: item.generationStatus }); } catch (error) { next(error); }
});
router.get('/:id', requireAuth, async (req, res, next) => {
  try { const item = await owned(req.params.id, req.user._id).select('-blueprint -timeline'); if (!item) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); ok(res, { investigation: item }); } catch (error) { next(error); }
});
router.post('/:id/evidence/:evidenceId/review', requireAuth, async (req, res, next) => {
  try { const item = await owned(req.params.id, req.user._id); if (!item) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); if (!item.reviewedEvidenceIds.some((id) => id.toString() === req.params.evidenceId)) item.reviewedEvidenceIds.push(req.params.evidenceId); await item.save(); ok(res, { reviewed: true }); } catch (error) { next(error); }
});
router.post('/:id/evidence/:evidenceId/bookmark', requireAuth, async (req, res, next) => {
  try { const item = await owned(req.params.id, req.user._id); if (!item) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); const index = item.bookmarkedEvidenceIds.findIndex((id) => id.toString() === req.params.evidenceId); if (index >= 0) item.bookmarkedEvidenceIds.splice(index, 1); else item.bookmarkedEvidenceIds.push(req.params.evidenceId); await item.save(); ok(res, { bookmarked: index < 0 }); } catch (error) { next(error); }
});
router.get('/:id/notes', requireAuth, async (req, res, next) => { try { if (!await owned(req.params.id, req.user._id)) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); ok(res, { notes: await Note.find({ investigationId: req.params.id, userId: req.user._id }).sort('-createdAt') }); } catch (error) { next(error); } });
router.post('/:id/notes', requireAuth, async (req, res, next) => { try { if (!await owned(req.params.id, req.user._id)) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); const data = z.object({ content: z.string().trim().min(1).max(5000), evidenceId: z.string().optional() }).parse(req.body); ok(res, { note: await Note.create({ ...data, investigationId: req.params.id, userId: req.user._id }) }, 201); } catch (error) { next(error); } });
router.post('/:id/accusation', requireAuth, async (req, res, next) => {
  try {
    const item = await Investigation.findOne({ _id: req.params.id, userId: req.user._id }).select('+blueprint +timeline');
    if (!item) return fail(res, 'Investigation not found', 404, 'NOT_FOUND');
    if (await Accusation.exists({ investigationId: item._id, userId: req.user._id })) return fail(res, 'This investigation already has an accusation', 409, 'ACCUSATION_EXISTS');
    const data = z.object({ selectedSuspectId: z.string(), reasoning: z.string().max(5000).optional() }).parse(req.body);
    const isCorrect = data.selectedSuspectId === item.blueprint.culpritId.toString();
    const accusation = await Accusation.create({ ...data, userId: req.user._id, investigationId: item._id, isCorrect, actualCulpritId: item.blueprint.culpritId });
    item.status = 'COMPLETED'; item.completedAt = new Date(); await item.save();
    ok(res, { accusation }, 201);
  } catch (error) { next(error); }
});
router.get('/:id/result', requireAuth, async (req, res, next) => {
  try { const item = await Investigation.findOne({ _id: req.params.id, userId: req.user._id }).select('+blueprint +timeline'); const accusation = await Accusation.findOne({ investigationId: req.params.id, userId: req.user._id }); if (!item || !accusation) return fail(res, 'Result is not available', 404, 'NOT_FOUND'); ok(res, { result: { accusation, culpritId: item.blueprint.culpritId, culpritIdentity: item.blueprint.culpritIdentity, motive: item.blueprint.motive, timeline: item.timeline } }); } catch (error) { next(error); }
});
router.delete('/:id', requireAuth, async (req, res, next) => { try { const item = await Investigation.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); if (!item) return fail(res, 'Investigation not found', 404, 'NOT_FOUND'); await Note.deleteMany({ investigationId: req.params.id }); await Accusation.deleteMany({ investigationId: req.params.id }); ok(res, { deleted: true }); } catch (error) { next(error); } });
router.patch('/notes/:noteId', requireAuth, async (req, res, next) => { try { const data = z.object({ content: z.string().trim().min(1).max(5000) }).parse(req.body); const note = await Note.findOneAndUpdate({ _id: req.params.noteId, userId: req.user._id }, data, { new: true }); if (!note) return fail(res, 'Note not found', 404, 'NOT_FOUND'); ok(res, { note }); } catch (error) { next(error); } });
router.delete('/notes/:noteId', requireAuth, async (req, res, next) => { try { const note = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user._id }); if (!note) return fail(res, 'Note not found', 404, 'NOT_FOUND'); ok(res, { deleted: true }); } catch (error) { next(error); } });
export default router;
