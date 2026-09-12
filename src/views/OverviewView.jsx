import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Activity,
  ArrowUpRight,
  GitFork,
  Radio,
  Clock,
  HelpCircle
} from 'lucide-react';
import PipelineVisualizer from '../components/PipelineVisualizer';
import { fetchConversations } from '../api';

export default function OverviewView({ 
  evaluationData, 
  systemStatus, 
  onNavigateToAnalyze,
  onNavigateToConversations,
  onNavigateToEvaluation 
}) {
  const headline = evaluationData?.headline_metrics || {};
  const [recentCases, setRecentCases] = useState([]);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    fetchConversations({ page: 1, pageSize: 4 })
      .then(res => {
        if (res?.items) {
          setRecentCases(res.items);
        }
      })
      .catch(err => console.error("Failed to load recent cases:", err))
      .finally(() => setLoadingCases(false));
  }, []);

  const SAMPLE_QUERIES = [
    {
      title: "Self-Service Return Window",
      text: "How do I return my unopened package and get a prepaid drop-off QR code?",
      intent: "Returns & Replacements",
      expected: "SAFE_TO_AUTO_HANDLE"
    },
    {
      title: "Delayed Delivery Inquiry",
      text: "I've been waiting for my delivery for 4 days. Tracking hasn't updated since Monday.",
      intent: "Delivery Delay & Tracking",
      expected: "SAFE_TO_AUTO_HANDLE"
    },
    {
      title: "Account Transaction Dispute",
      text: "Order 114-8921746-1892837 was charged twice to my Visa card. I need a refund immediately.",
      intent: "Refund & Payment Status",
      expected: "ESCALATE_TO_HUMAN"
    },
    {
      title: "Stolen / Damaged Package",
      text: "My parcel was left in the rain and the merchandise inside is completely broken and soaked.",
      intent: "Damaged or Missing Items",
      expected: "ESCALATE_TO_HUMAN"
    }
  ];

  return (
    <div>
      {/* 1. HERO COMPOSITION (2-Column with Live Intelligence Visual Panel) */}
      <section className="hero-layout">
        {/* Left Column: Headline & Value Proposition */}
        <div className="hero-text-col">
          <div className="hero-eyebrow">
            <Activity size={14} color="var(--primary-dark)" />
            Evidence-Grounded AI Support Operations
          </div>

          <h1 className="hero-title">
            ResolveIQ
          </h1>

          <p className="hero-subtitle">
            Precision support intelligence with verifiable evidence lineage. Built on authentic multi-turn conversations from the @AmazonHelp support archive to prevent hallucinations and safely gate escalations.
          </p>

          <div className="hero-meta-strip">
            <div className="hero-meta-pill">
              <span className="pulse-dot"></span>
              <span>@AmazonHelp Corpus</span>
            </div>
            <div className="hero-meta-pill">
              <Layers size={13} color="var(--primary-dark)" />
              <span>10-Class Calibrated Taxonomy</span>
            </div>
            <div className="hero-meta-pill">
              <ShieldCheck size={13} color="var(--primary-dark)" />
              <span>Multi-Signal Safety Gating</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Support Intelligence Visual Panel */}
        <div className="live-intelligence-panel">
          <div className="panel-header-row">
            <div className="panel-title">
              <Radio size={14} color="var(--primary)" />
              <span>Live Support Intelligence</span>
            </div>
            <div className="panel-status-pill">
              <span className="pulse-dot"></span>
              <span>{systemStatus?.brand || '@AmazonHelp'} · {systemStatus?.status || 'Online'}</span>
            </div>
          </div>

          <div className="panel-telemetry-row">
            {/* Pipeline Stage Flow */}
            <div className="telemetry-item">
              <span className="telemetry-label">Current Pipeline Flow</span>
              <div className="telemetry-flow">
                <span className="flow-step">Intent</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Evidence</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">Grounding</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step" style={{ color: 'var(--primary-dark)' }}>Decision</span>
              </div>
            </div>

            {/* Evidence Confidence Meter */}
            <div className="telemetry-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="telemetry-label">Evidence Groundedness</span>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--primary-darker)', fontFamily: 'var(--font-serif)' }}>
                  {headline.groundedness_rate !== undefined ? `${(headline.groundedness_rate * 100).toFixed(1)}%` : '—'}
                </span>
              </div>
              <div className="meter-track">
                <div 
                  className="meter-fill" 
                  style={{ width: headline.groundedness_rate !== undefined ? `${(headline.groundedness_rate * 100).toFixed(1)}%` : '100%' }}
                ></div>
              </div>
            </div>

            {/* Risk State & Recent Signal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="telemetry-item">
                <span className="telemetry-label">Risk State</span>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--status-pass-text)',
                  backgroundColor: 'var(--status-pass-bg)',
                  border: '1px solid var(--status-pass-border)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <ShieldCheck size={13} />
                  MONITORED
                </div>
              </div>

              <div className="telemetry-item">
                <span className="telemetry-label">Taxonomy State</span>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--primary-darker)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  10 Classes Active
                </div>
              </div>
            </div>

            {/* Recent Operational Signal */}
            <div className="telemetry-item">
              <span className="telemetry-label">Recent Operational Signal</span>
              <div className="signal-box">
                <span style={{ fontStyle: 'italic', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                  "Tracking status unchanged after 4 days"
                </span>
                <span className="badge badge-intent" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                  Delivery Delay
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPROVED KPI HIERARCHY (Model Quality vs Safety Risk vs Coverage) */}
      <section className="metrics-section">
        <div className="metrics-hierarchy-grid">
          
          {/* Cluster 1: Core Model Quality */}
          <div className="metrics-cluster">
            <div className="metrics-cluster-header">
              <div className="metrics-cluster-title">
                <Sparkles size={14} color="var(--primary)" />
                <span>Core Model Quality</span>
              </div>
              <span className="metrics-cluster-tag">Calibrated Performance</span>
            </div>

            <div className="metrics-cluster-cards">
              <div className="kpi-card-inner">
                <div className="kpi-label">
                  <span>Intent Macro F1</span>
                  <Sparkles size={14} color="var(--primary)" />
                </div>
                <div className="kpi-value">
                  {headline.intent_macro_f1 !== undefined ? `${(headline.intent_macro_f1 * 100).toFixed(1)}%` : '—'}
                </div>
                <div className="kpi-context">10-class calibrated taxonomy</div>
              </div>

              <div className="kpi-card-inner">
                <div className="kpi-label">
                  <span>Evidence Groundedness</span>
                  <ShieldCheck size={14} color="var(--primary-dark)" />
                </div>
                <div className="kpi-value">
                  {headline.groundedness_rate !== undefined ? `${(headline.groundedness_rate * 100).toFixed(1)}%` : '—'}
                </div>
                <div className="kpi-context">Verified against historical cases</div>
              </div>
            </div>
          </div>

          {/* Cluster 2: Safety Risk Metrics */}
          <div className="metrics-cluster" style={{ borderColor: 'var(--border-strong)' }}>
            <div className="metrics-cluster-header">
              <div className="metrics-cluster-title">
                <ShieldCheck size={14} color="var(--primary-dark)" />
                <span>Safety Risk Metrics</span>
              </div>
              <span className="metrics-cluster-tag">Risk & Interception</span>
            </div>

            <div className="metrics-cluster-cards">
              <div className="kpi-card-inner">
                <div className="kpi-label">
                  <span>Escalation Recall</span>
                  <CheckCircle2 size={14} color="var(--primary)" />
                </div>
                <div className="kpi-value">
                  {headline.escalation_recall !== undefined ? `${(headline.escalation_recall * 100).toFixed(1)}%` : '—'}
                </div>
                <div className="kpi-context">Multi-signal risk safety capture</div>
              </div>

              <div className="kpi-card-inner" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="kpi-label">
                  <span style={{ color: 'var(--text-primary)' }}>False Auto-Handle</span>
                  <AlertTriangle size={14} color="var(--status-warning-text)" />
                </div>
                <div className="kpi-value" style={{ color: 'var(--text-primary)' }}>
                  {headline.false_auto_handle_rate !== undefined ? `${(headline.false_auto_handle_rate * 100).toFixed(1)}%` : '—'}
                </div>
                <div className="kpi-risk-badge">
                  Safety risk metric
                </div>
              </div>
            </div>
          </div>

          {/* Cluster 3: Evaluation Coverage */}
          <div className="metrics-cluster">
            <div className="metrics-cluster-header">
              <div className="metrics-cluster-title">
                <Database size={14} color="var(--text-muted)" />
                <span>Coverage</span>
              </div>
              <span className="metrics-cluster-tag">Offline Eval</span>
            </div>

            <div className="metrics-cluster-single">
              <div className="kpi-card-inner" style={{ flex: 1, justifyContent: 'center' }}>
                <div className="kpi-label">
                  <span>Golden Eval Set</span>
                  <Database size={14} color="var(--text-muted)" />
                </div>
                <div className="kpi-value">
                  {evaluationData?.golden_set_size || 200}
                </div>
                <div className="kpi-context">
                  Manually verified test samples with human adjudication
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ARCHITECTURE PIPELINE VISUALIZATION */}
      <PipelineVisualizer activeStep={0} />

      {/* 4. TWO-COLUMN OPERATIONAL SUMMARY & 1-CLICK DEMOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Left: System Safety & Grounding Principles */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <ShieldCheck size={20} color="var(--primary-dark)" />
              System Safety & Grounding Principles
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--primary-darker)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.84rem',
                flexShrink: 0
              }}>1</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.92rem' }}>
                  No Hallucinated Commitments
                </strong>
                <p style={{ fontSize: '0.86rem' }}>
                  The generation layer is strictly constrained to historical support resolutions. It never invents arbitrary refund amounts, timeline promises, or fabricated account actions.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--primary-darker)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.84rem',
                flexShrink: 0
              }}>2</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.92rem' }}>
                  Multi-Signal Risk Escalation
                </strong>
                <p style={{ fontSize: '0.86rem' }}>
                  Rather than relying on brittle confidence thresholds alone, ResolveIQ inspects intent confidence, retrieval similarity, claim verification, order ID lookups, and damage indicators before authorizing auto-response.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--primary-darker)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.84rem',
                flexShrink: 0
              }}>3</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.92rem' }}>
                  Transparent Evidence Lineage
                </strong>
                <p style={{ fontSize: '0.86rem' }}>
                  Every generated reply cites the exact historical Twitter support precedents that authorized the resolution, giving operators complete auditability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Interactive Exploration */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Sparkles size={20} color="var(--primary)" />
              Try Real Support Queries
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1-Click Sandbox Analysis</span>
          </div>

          <p style={{ fontSize: '0.86rem', marginBottom: '1rem' }}>
            Click any authentic customer scenario below to launch the live multi-stage analysis pipeline:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SAMPLE_QUERIES.map((q, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToAnalyze(q.text)}
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{q.title}</strong>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: q.expected === 'SAFE_TO_AUTO_HANDLE' ? 'var(--status-pass-bg)' : 'var(--status-escalate-bg)',
                      color: q.expected === 'SAFE_TO_AUTO_HANDLE' ? 'var(--status-pass-text)' : 'var(--status-escalate-text)',
                      border: `1px solid ${q.expected === 'SAFE_TO_AUTO_HANDLE' ? 'var(--status-pass-border)' : 'var(--status-escalate-border)'}`
                    }}>
                      {q.expected === 'SAFE_TO_AUTO_HANDLE' ? 'Auto-Handle' : 'Escalate'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    "{q.text}"
                  </div>
                </div>
                <ArrowRight size={16} color="var(--primary-dark)" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. RECENT SUPPORT INTELLIGENCE (Real API Data Lower Section) */}
      <section className="recent-intelligence-section">
        <div className="recent-intelligence-header">
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}>
              <Activity size={16} color="var(--primary-dark)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                Recent Support Intelligence
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Live sample of authentic customer dialogues and precedent resolutions from the @AmazonHelp corpus
            </p>
          </div>

          {onNavigateToConversations && (
            <button
              onClick={onNavigateToConversations}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
            >
              <span>View all conversations</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {loadingCases ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Loading live support dialogues...
          </div>
        ) : recentCases.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            No recent cases available.
          </div>
        ) : (
          <div>
            {recentCases.map((item) => {
              const isEscalate = item.escalation_indicator;
              return (
                <div key={item.id} className="recent-case-item">
                  {/* Customer Query */}
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                      Customer Query
                    </span>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      "{item.customer_message}"
                    </div>
                  </div>

                  {/* Intent & Evidence Precedent */}
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                      Intent Classification
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-intent" style={{ fontSize: '0.76rem' }}>
                        {item.intent_display}
                      </span>
                    </div>
                  </div>

                  {/* Decision Precedent */}
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                      Safety Decision
                    </span>
                    <span style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isEscalate ? 'var(--status-escalate-bg)' : 'var(--status-pass-bg)',
                      color: isEscalate ? 'var(--status-escalate-text)' : 'var(--status-pass-text)',
                      border: `1px solid ${isEscalate ? 'var(--status-escalate-border)' : 'var(--status-pass-border)'}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      {isEscalate ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      {isEscalate ? 'Escalate' : 'Auto-Handle'}
                    </span>
                  </div>

                  {/* Action Link */}
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => onNavigateToAnalyze(item.customer_message)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                      title="Analyze this query in the live pipeline"
                    >
                      <span>Analyze</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
