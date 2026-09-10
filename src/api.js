/**
 * ResolveIQ API Client
 */

const API_BASE = '/api';

export async function fetchSystemStatus() {
  const resp = await fetch(`${API_BASE}/system-status`);
  if (!resp.ok) throw new Error(`Status check failed: ${resp.statusText}`);
  return resp.json();
}

export async function analyzeMessage(message, channel = 'Twitter Support') {
  const resp = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, channel })
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ detail: resp.statusText }));
    throw new Error(err.detail || 'Analysis request failed');
  }
  return resp.json();
}

export async function fetchConversations({ intent, search, page = 1, pageSize = 15 }) {
  const params = new URLSearchParams({ page, page_size: pageSize });
  if (intent && intent !== 'all') params.append('intent', intent);
  if (search) params.append('search', search);

  const resp = await fetch(`${API_BASE}/conversations?${params.toString()}`);
  if (!resp.ok) throw new Error(`Failed to load conversations: ${resp.statusText}`);
  return resp.json();
}

export async function fetchEvidenceDetail(id) {
  const resp = await fetch(`${API_BASE}/evidence/${id}`);
  if (!resp.ok) throw new Error(`Failed to load evidence detail: ${resp.statusText}`);
  return resp.json();
}

export async function fetchEvaluationResults() {
  const resp = await fetch(`${API_BASE}/evaluation`);
  if (!resp.ok) throw new Error(`Failed to load evaluation metrics: ${resp.statusText}`);
  return resp.json();
}

export async function fetchFailures() {
  const resp = await fetch(`${API_BASE}/failures`);
  if (!resp.ok) throw new Error(`Failed to load failure analysis: ${resp.statusText}`);
  return resp.json();
}
