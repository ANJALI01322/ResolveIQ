import React from 'react';
import { ShieldCheck, UserCheck, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export function DecisionBadge({ decision }) {
  if (decision === 'SAFE_TO_AUTO_HANDLE') {
    return (
      <span className="badge badge-auto-handle">
        <CheckCircle2 size={13} strokeWidth={2.5} />
        Safe to Auto-Handle
      </span>
    );
  }
  return (
    <span className="badge badge-escalate">
      <UserCheck size={13} strokeWidth={2.5} />
      Escalate to Human
    </span>
  );
}

export function GroundingBadge({ status, score }) {
  if (status === 'SUPPORTED') {
    return (
      <span className="badge badge-auto-handle" title={`Grounding fidelity: ${(score * 100).toFixed(0)}%`}>
        <ShieldCheck size={13} strokeWidth={2.5} />
        Evidence Grounded
      </span>
    );
  }
  return (
    <span className="badge badge-escalate" title="Potential unsupported claim flagged">
      <ShieldAlert size={13} strokeWidth={2.5} />
      Claim Flagged
    </span>
  );
}

export function IntentBadge({ intentName, confidence }) {
  return (
    <span className="badge badge-intent">
      <span>{intentName}</span>
      {confidence !== undefined && (
        <strong style={{ marginLeft: '4px', opacity: 0.85 }}>
          {(confidence * 100).toFixed(0)}%
        </strong>
      )}
    </span>
  );
}
