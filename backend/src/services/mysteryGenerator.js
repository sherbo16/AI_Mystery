import Investigation from '../models/Investigation.js';
import { generateBlueprint } from './geminiService.js';

export async function generateInvestigation(investigation, input) {
  const update = (generationStatus) => Investigation.updateOne({ _id: investigation._id }, { generationStatus });
  try {
    await update('Understanding your story');
    const blueprint = await generateBlueprint(input);
    if (!blueprint.culpritId || !Array.isArray(blueprint.suspects) || !Array.isArray(blueprint.evidence)) {
      throw Object.assign(new Error('Generated case is incomplete'), { code: 'CASE_VALIDATION_FAILED' });
    }
    if (!blueprint.suspects.some((suspect) => suspect.id === blueprint.culpritId)) {
      throw Object.assign(new Error('Generated culprit is not a suspect'), { code: 'CASE_VALIDATION_FAILED' });
    }
    await update('Preparing investigation files');
    const suspectIds = new Map(blueprint.suspects.map((suspect) => [suspect.id, suspect]));
    const suspects = blueprint.suspects.map(({ id, ...suspect }) => ({ ...suspect, _sourceId: id }));
    const idMap = new Map(suspects.map((suspect) => [suspect._sourceId, suspect._id]));
    const evidence = blueprint.evidence.map((item) => ({
      ...item,
      relatedSuspectIds: (item.relatedSuspectIds || []).filter((id) => suspectIds.has(id)).map((id) => idMap.get(id)),
    }));
    const culpritMongoId = idMap.get(blueprint.culpritId);
    const privateBlueprint = { ...blueprint, culpritId: culpritMongoId, culpritIdentity: blueprint.suspects.find((s) => s.id === blueprint.culpritId)?.name };
    await Investigation.updateOne({ _id: investigation._id }, {
      title: input.title || blueprint.title, suspects, evidence, blueprint: privateBlueprint,
      timeline: blueprint.timeline, status: 'ACTIVE', generationStatus: 'Ready',
    });
  } catch (error) {
    await Investigation.updateOne({ _id: investigation._id }, { status: 'FAILED', generationStatus: error.message });
  }
}
