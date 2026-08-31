import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Incident -> Problem Management touchpoint. See
 * src/server/script-includes/itom-problem-candidate-evaluator.js for the
 * implementation and full rationale.
 */
export const itomProblemCandidateEvaluator = ScriptInclude({
    $id: Now.ID['script-include-itom-problem-candidate-evaluator'],
    name: 'ITOMProblemCandidateEvaluator',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Flags a Monitored Service as a Problem candidate once its CI has generated 3+ auto-created incidents within 24 hours (ITIL Incident-to-Problem escalation).',
    script: Now.include('../../server/script-includes/itom-problem-candidate-evaluator.js'),
})
