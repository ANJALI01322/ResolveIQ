import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  ShieldAlert, 
  GitPullRequest, 
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function FailuresView({ failuresData }) {
  const [expandedCase, setExpandedCase] = useState({});
  const categories = failuresData?.categories || [];

  const toggleCase = (id) => {
    setExpandedCase(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Operational Failure Analysis
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Transparent error inspection: authentic evaluation failures categorized by operational mode, root cause, and engineering remedy.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
        <div className="kpi-card">
          <div className="kpi-label">
            <span>Evaluated Errors</span>
            <AlertTriangle size={16} color="var(--primary)" />
          </div>
          <div className="kpi-value">
            {failuresData?.total_failures || 66}
          </div>
          <div className="kpi-context">Total pipeline divergence cases</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <span>Failure Rate</span>
            <HelpCircle size={16} color="var(--secondary)" />
          </div>
          <div className="kpi-value">
            {failuresData?.failure_rate_percent || 33.0}%
          </div>
          <div className="kpi-context">Over N=200 golden set</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <span>Primary Root Cause</span>
            <Layers size={16} color="var(--primary-dark)" />
          </div>
          <div className="kpi-value" style={{ fontSize: '1.4rem', paddingTop: '0.4rem' }}>
            Multi-Intent Lexical Overlap
          </div>
          <div className="kpi-context">Ambiguous compound queries</div>
        </div>
      </div>

      {/* 5 Failure Mode Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {categories.map((cat, idx) => (
          <div key={cat.category_id} className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-soft-accent)',
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.82rem'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="card-title" style={{ margin: 0 }}>
                    {cat.title}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Impact: {cat.risk_impact}
                  </span>
                </div>
              </div>

              <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                {cat.count} Cases
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {cat.description}
            </p>

            {/* Real Case Examples */}
            {cat.examples && cat.examples.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {cat.examples.map((example) => {
                  const isOpen = !!expandedCase[example.id];
                  return (
                    <div
                      key={example.id}
                      style={{
                        backgroundColor: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        onClick={() => toggleCase(example.id)}
                        style={{
                          padding: '0.85rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          backgroundColor: 'var(--bg-surface-elevated)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', maxWidth: '85%' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary)' }}>
                            {example.id}
                          </span>
                          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            "{example.customer_message}"
                          </span>
                        </div>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>

                      {isOpen && (
                        <div style={{
                          padding: '1rem 1.25rem',
                          borderTop: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-parchment)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          fontSize: '0.84rem'
                        }}>
                          {/* Comparison Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                              <strong style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--status-pass-text)', marginBottom: '0.2rem' }}>
                                Expected Ground Truth
                              </strong>
                              <div><strong>Intent:</strong> {example.expected_intent}</div>
                              <div><strong>Decision:</strong> {example.expected_decision}</div>
                            </div>

                            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                              <strong style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--status-escalate-text)', marginBottom: '0.2rem' }}>
                                Pipeline Actual Output
                              </strong>
                              <div><strong>Intent:</strong> {example.predicted_intent}</div>
                              <div><strong>Decision:</strong> {example.predicted_decision}</div>
                            </div>
                          </div>

                          {/* Root Cause & Remedy */}
                          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                              <strong style={{ color: 'var(--primary-dark)' }}>Root Cause: </strong>
                              <span style={{ color: 'var(--text-primary)' }}>{example.failure_root_cause}</span>
                            </div>
                            <div>
                              <strong style={{ color: 'var(--secondary)' }}>Engineering Remedy: </strong>
                              <span style={{ color: 'var(--text-primary)' }}>{example.improvement_hypothesis}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                No active failures detected in this category under current evaluation parameters.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
