import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema({
  name: String, age: Number, occupation: String, avatar: String,
  relationship: String, background: String, motive: String, alibi: String,
}, { _id: true });

const evidenceSchema = new mongoose.Schema({
  type: { type: String, enum: ['CHAT', 'IMAGE', 'CCTV', 'DOCUMENT', 'CALL_RECORD', 'WITNESS'] },
  title: String, description: String, content: mongoose.Schema.Types.Mixed,
  mediaUrl: String, metadata: mongoose.Schema.Types.Mixed,
  internalClassification: String, relatedSuspectIds: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

const investigationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  caseId: { type: String, required: true, unique: true },
  title: String, scenario: String,
  category: { type: String, enum: ['THEFT', 'MISSING_PERSON', 'CYBER_MYSTERY', 'GENERAL_MYSTERY'] },
  difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'] },
  status: { type: String, enum: ['GENERATING', 'ACTIVE', 'COMPLETED', 'FAILED'], default: 'GENERATING' },
  generationStatus: { type: String, default: 'Starting investigation' },
  blueprint: { type: mongoose.Schema.Types.Mixed, select: false },
  suspects: [suspectSchema],
  evidence: [evidenceSchema],
  reviewedEvidenceIds: [{ type: mongoose.Schema.Types.ObjectId }],
  bookmarkedEvidenceIds: [{ type: mongoose.Schema.Types.ObjectId }],
  timeline: { type: mongoose.Schema.Types.Mixed, select: false },
  completedAt: Date,
}, { timestamps: true });

export default mongoose.model('Investigation', investigationSchema);
