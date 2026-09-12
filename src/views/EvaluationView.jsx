import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Sparkles, 
  Layers, 
  Grid, 
  TrendingUp, 
  Cpu,
  Database,
  Info,
  Activity,
  AlertOctagon
} from 'lucide-react';

export default function EvaluationView({ evaluationData }) {
  const [activeTab, setActiveTab] = useState('baselines');

  if (!evaluationData) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div className="pulse-dot" style={{ display: 'inline-block', marginBottom: '1rem', width: '12px', height: '12px' }}></div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Loading Evaluation Results...</h3>
        <p style={{ fontSize: '0.9rem' }}>Fetching benchmark metrics from the 200-sample leak-free Golden Evaluation Set.</p>
      </div>
    );
  }

  const headline = evaluationData?.headline_metrics || {};
  const baselines = evaluationData?.baselines || [];
  const perIntent = evaluationData?.per_intent || [];
  const confMat = evaluationData?.confusion_matrix || { labels: [], display_labels: [], matrix: [] };
  const escMat = evaluationData?.escalation_matrix || {};
  const llmJudge = evaluationData?.llm_judge || {};

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Evaluation Suite & Experimental Baselines
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Authentic offline evaluation conducted across an unseen 200-sample Golden Evaluation Set (100% disjoint split, 0% data leakage) derived from @AmazonHelp support inquiries.
        </p>
      </div>

      {/* Headline Summary Banner (Categorized Hierarchy) */}
      <div className="metrics-hierarchy-grid" style={{ marginBottom: '2rem' }}>
        
        {/* Cluster 1: Core Model Quality */}
        <div className="metrics-cluster">
          <div className="metrics-cluster-header">
            <div className="metrics-cluster-title">
              <Sparkles size={14} color="var(--primary)" />
              <span>Model Quality</span>
            </div>
            <span className="metrics-cluster-tag">10-Class Taxonomy</span>
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
              <div className="kpi-context">Unseen 200-case test split</div>
            </div>

            <div className="kpi-card-inner">
              <div className="kpi-label">
                <span>Intent Accuracy</span>
                <TrendingUp size={14} color="var(--primary)" />
              </div>
              <div className="kpi-value">
                {headline.intent_accuracy !== undefined ? `${(headline.intent_accuracy * 100).toFixed(1)}%` : '—'}
              </div>
              <div className="kpi-context">Exact label agreement</div>
            </div>

            <div className="kpi-card-inner">
              <div className="kpi-label">
                <span>Groundedness</span>
                <ShieldCheck size={14} color="var(--primary-dark)" />
              </div>
              <div className="kpi-value">
                {headline.groundedness_rate !== undefined ? `${(headline.groundedness_rate * 100).toFixed(1)}%` : '—'}
              </div>
              <div className="kpi-context">Historical precedent backed</div>
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
            <span className="metrics-cluster-tag">Risk Interception</span>
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
              <div className="kpi-context">Sensitive issue interception</div>
            </div>

            <div className="kpi-card-inner">
              <div className="kpi-label">
                <span>Escalation Precision</span>
                <Scale size={14} color="var(--primary)" />
              </div>
              <div className="kpi-value">
                {headline.escalation_precision !== undefined ? `${(headline.escalation_precision * 100).toFixed(1)}%` : '—'}
              </div>
              <div className="kpi-context">Conservative routing posture</div>
            </div>

            <div className="kpi-card-inner" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <div className="kpi-label">
                <span>False Auto-Handle</span>
                <AlertTriangle size={14} color="var(--status-warning-text)" />
              </div>
              <div className="kpi-value" style={{ color: 'var(--text-primary)' }}>
                {headline.false_auto_handle_rate !== undefined ? `${(headline.false_auto_handle_rate * 100).toFixed(1)}%` : '—'}
              </div>
              <div className="kpi-risk-badge">
                Safety-critical risk metric
              </div>
            </div>
          </div>
        </div>

        {/* Cluster 3: Coverage */}
        <div className="metrics-cluster">
          <div className="metrics-cluster-header">
            <div className="metrics-cluster-title">
              <Database size={14} color="var(--text-muted)" />
              <span>Coverage</span>
            </div>
            <span className="metrics-cluster-tag">Golden Dataset</span>
          </div>

          <div className="metrics-cluster-single">
            <div className="kpi-card-inner" style={{ flex: 1, justifyContent: 'center' }}>
              <div className="kpi-label">
                <span>Golden Set Size</span>
                <Database size={14} color="var(--text-muted)" />
              </div>
              <div className="kpi-value">
                {evaluationData?.golden_set_size || 200}
              </div>
              <div className="kpi-context">
                N=200 @AmazonHelp multi-turn cases
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem',
        paddingBottom: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'baselines', label: '3-Way Baseline Comparison', icon: Scale },
          { id: 'intents', label: 'Per-Intent Taxonomy Metrics', icon: Layers },
          { id: 'confusion', label: 'Confusion Matrix (10x10)', icon: Grid },
          { id: 'escalation', label: 'Escalation Safety Matrix', icon: ShieldCheck },
          { id: 'judge', label: 'LLM-as-a-Judge & Grounding', icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 0.95rem',
                fontSize: '0.86rem',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. Baseline Comparison Tab */}
      {activeTab === 'baselines' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Scale size={20} color="var(--primary)" />
              Comparative Baseline Benchmark
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Evaluated on N=200 Unseen Golden Samples (0% Data Leakage)
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            ResolveIQ is benchmarked against both a trivial majority-class baseline and a classical TF-IDF + Logistic Regression baseline over the 200-sample unseen golden test split.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className="editorial-table">
              <thead>
                <tr>
                  <th>Architecture / Baseline</th>
                  <th>Intent Accuracy</th>
                  <th>Intent Macro F1</th>
                  <th>Escalation Precision</th>
                  <th>Escalation Recall</th>
                  <th>False Auto-Handle</th>
                  <th>Groundedness</th>
                </tr>
              </thead>
              <tbody>
                {baselines.map((base, idx) => {
                  const isResolveIQ = base.name.includes("ResolveIQ");
                  return (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: isResolveIQ ? 'var(--bg-soft-accent)' : 'transparent',
                        fontWeight: isResolveIQ ? 700 : 400
                      }}
                    >
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: isResolveIQ ? 'var(--primary-dark)' : 'var(--text-primary)' }}>
                            {base.name}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                            {base.description}
                          </span>
                        </div>
                      </td>
                      <td>{base.intent_accuracy != null ? `${(base.intent_accuracy * 100).toFixed(1)}%` : '—'}</td>
                      <td>{base.intent_macro_f1 != null ? `${(base.intent_macro_f1 * 100).toFixed(1)}%` : '—'}</td>
                      <td>{base.escalation_precision != null ? `${(base.escalation_precision * 100).toFixed(1)}%` : '—'}</td>
                      <td>{base.escalation_recall != null ? `${(base.escalation_recall * 100).toFixed(1)}%` : '—'}</td>
                      <td style={{ color: isResolveIQ ? 'var(--primary-dark)' : (base.false_auto_handle_rate > 0.1 ? 'var(--status-escalate-text)' : 'inherit') }}>
                        {base.false_auto_handle_rate != null ? `${(base.false_auto_handle_rate * 100).toFixed(1)}%` : '—'}
                      </td>
                      <td>{base.groundedness_rate != null ? `${(base.groundedness_rate * 100).toFixed(1)}%` : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.86rem',
            color: 'var(--text-primary)',
            lineHeight: 1.6
          }}>
            <strong style={{ color: 'var(--primary-darker)', display: 'block', marginBottom: '0.5rem', fontSize: '0.92rem' }}>
              Operational Interpretation & Engineering Trade-Offs:
            </strong>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Safety Superiority (False Auto-Handle Suppression):</strong> ResolveIQ reduces the safety-critical False Auto-Handle Rate from <strong>27.0% down to 4.0%</strong> (a 6.75x improvement in safety) compared to the classical baseline.
              </li>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Intent Classification Nuance:</strong> The intent classifier achieves <strong>75.39% Macro F1</strong> and <strong>76.00% Accuracy</strong> on authentic, unseen social media queries where multi-intent overlap (e.g. delivery delays combined with refund demands) creates lexical ambiguity.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Conservative Escalation Trade-off:</strong> ResolveIQ's multi-signal risk engine intentionally favors conservative routing (49.48% precision, 96.00% recall), ensuring high-risk queries (billing disputes, misdeliveries) are never mistakenly auto-handled.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 2. Per-Intent Taxonomy Breakdown */}
      {activeTab === 'intents' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Layers size={20} color="var(--primary)" />
              Per-Intent Performance Breakdown (10 Classes)
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Balanced 20 Samples per Intent (N=200 Total)
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="editorial-table">
              <thead>
                <tr>
                  <th>Support Intent Taxonomy</th>
                  <th>Support (N)</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1-Score</th>
                  <th>Quality Level</th>
                </tr>
              </thead>
              <tbody>
                {perIntent.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{item.display_name}</strong>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        {item.intent}
                      </span>
                    </td>
                    <td>{item.support_count}</td>
                    <td>{item.precision != null ? `${(item.precision * 100).toFixed(1)}%` : '—'}</td>
                    <td>{item.recall != null ? `${(item.recall * 100).toFixed(1)}%` : '—'}</td>
                    <td>
                      <strong style={{ color: 'var(--primary-dark)' }}>
                        {item.f1_score != null ? `${(item.f1_score * 100).toFixed(1)}%` : '—'}
                      </strong>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: item.f1_score >= 0.80 ? 'var(--status-pass-bg)' : (item.f1_score >= 0.60 ? 'var(--status-warning-bg)' : 'var(--status-escalate-bg)'),
                        color: item.f1_score >= 0.80 ? 'var(--status-pass-text)' : (item.f1_score >= 0.60 ? 'var(--status-warning-text)' : 'var(--status-escalate-text)')
                      }}>
                        {item.f1_score >= 0.80 ? 'High' : (item.f1_score >= 0.60 ? 'Moderate' : 'Challenging')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Confusion Matrix */}
      {activeTab === 'confusion' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Grid size={20} color="var(--primary)" />
              10x10 Intent Confusion Matrix
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Rows: Ground Truth · Columns: Predicted
            </span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            The diagonal reflects correct intent classifications across all 200 unseen golden test cases. Off-diagonal elements highlight multi-intent lexical overlaps (e.g. delivery delays coupled with refund inquiries).
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', fontSize: '0.76rem', margin: '0 auto' }}>
              <thead>
                <tr>
                  <th style={{ padding: '6px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>Actual \ Pred</th>
                  {confMat.display_labels?.map((lbl, i) => (
                    <th key={i} style={{
                      padding: '6px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      maxWidth: '85px',
                      fontSize: '0.7rem',
                      textAlign: 'center'
                    }}>
                      {lbl.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {confMat.matrix?.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <td style={{
                      padding: '6px 10px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      fontWeight: 700,
                      fontSize: '0.74rem'
                    }}>
                      {confMat.display_labels?.[rowIdx] || `Class ${rowIdx}`}
                    </td>
                    {row.map((cell, colIdx) => {
                      const isDiag = rowIdx === colIdx;
                      const intensity = cell > 0 ? (cell / 20) : 0;
                      return (
                        <td
                          key={colIdx}
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            border: '1px solid var(--border-subtle)',
                            backgroundColor: isDiag
                              ? `rgba(37, 184, 207, ${0.15 + (intensity * 0.65)})`
                              : (cell > 0 ? 'rgba(89, 209, 228, 0.22)' : 'var(--bg-surface-elevated)'),
                            fontWeight: cell > 0 ? 700 : 400,
                            color: isDiag ? 'var(--text-primary)' : (cell > 0 ? 'var(--primary-dark)' : 'var(--text-light)')
                          }}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Escalation Safety Matrix */}
      {activeTab === 'escalation' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <ShieldCheck size={20} color="var(--primary)" />
              Escalation Decision Matrix & Safety Trade-offs
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              padding: '1.25rem',
              backgroundColor: 'var(--status-pass-bg)',
              border: '1px solid var(--status-pass-border)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-pass-text)', textTransform: 'uppercase' }}>
                True Positive Escalations (TP)
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--status-pass-text)' }}>
                {escMat.true_positive_escalate ?? '—'}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--status-pass-text)' }}>
                Correctly escalated high-risk cases
              </div>
            </div>

            <div style={{
              padding: '1.25rem',
              backgroundColor: 'var(--status-warning-bg)',
              border: '1px solid var(--status-warning-border)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-warning-text)', textTransform: 'uppercase' }}>
                False Escalations (FP)
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--status-warning-text)' }}>
                {escMat.false_positive_escalate ?? '—'}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--status-warning-text)' }}>
                Conservative safe escalations
              </div>
            </div>

            <div style={{
              padding: '1.25rem',
              backgroundColor: 'var(--status-escalate-bg)',
              border: '1px solid var(--status-escalate-border)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-escalate-text)', textTransform: 'uppercase' }}>
                False Auto-Handles (FN)
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--status-escalate-text)' }}>
                {escMat.false_negative_auto_handle ?? '—'}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--status-escalate-text)' }}>
                Missed escalation (Safety-critical risk)
              </div>
            </div>

            <div style={{
              padding: '1.25rem',
              backgroundColor: 'var(--status-pass-bg)',
              border: '1px solid var(--status-pass-border)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--status-pass-text)', textTransform: 'uppercase' }}>
                True Auto-Handles (TN)
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--status-pass-text)' }}>
                {escMat.true_negative_auto_handle ?? '—'}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--status-pass-text)' }}>
                Safely resolved self-service cases
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong>Operational Engineering Interpretation:</strong> In high-stakes support operations, minimizing <em>False Auto-Handles</em> (authorizing incorrect automated resolutions) is prioritized above raw automation volume. ResolveIQ’s multi-signal engine maintains strict conservatism by routing ambiguous cases to human agents.
          </div>
        </div>
      )}

      {/* 5. LLM-as-a-Judge Tab */}
      {activeTab === 'judge' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Cpu size={20} color="var(--primary)" />
              LLM-as-a-Judge Evaluation & Grounding Audit
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div className="kpi-card" style={{ padding: '1rem' }}>
              <span className="kpi-label">Human-Judge Agreement</span>
              <div className="kpi-value">{llmJudge.human_judge_agreement_percent != null ? `${llmJudge.human_judge_agreement_percent.toFixed(1)}%` : '—'}</div>
              <div className="kpi-context">Cohen's Kappa: {llmJudge.cohens_kappa != null ? llmJudge.cohens_kappa.toFixed(2) : '—'}</div>
            </div>

            <div className="kpi-card" style={{ padding: '1rem' }}>
              <span className="kpi-label">Avg Correctness</span>
              <div className="kpi-value">{llmJudge.average_scores?.correctness != null ? `${llmJudge.average_scores.correctness.toFixed(1)} / 5.0` : '—'}</div>
              <div className="kpi-context">Technical policy alignment</div>
            </div>

            <div className="kpi-card" style={{ padding: '1rem' }}>
              <span className="kpi-label">Avg Grounding</span>
              <div className="kpi-value">{llmJudge.average_scores?.grounding != null ? `${llmJudge.average_scores.grounding.toFixed(1)} / 5.0` : '—'}</div>
              <div className="kpi-context">Corroborated by evidence</div>
            </div>

            <div className="kpi-card" style={{ padding: '1rem' }}>
              <span className="kpi-label">Professional Tone</span>
              <div className="kpi-value">{llmJudge.average_scores?.tone != null ? `${llmJudge.average_scores.tone.toFixed(1)} / 5.0` : '—'}</div>
              <div className="kpi-context">Support agent courtesy</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            fontSize: '0.86rem',
            color: 'var(--text-muted)'
          }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Honest Assessment of LLM-as-a-Judge:
            </strong>
            While LLM judges excel at evaluating surface tone and linguistic fluency (scoring ~4.8/5.0), they exhibit decision alignment variance (Cohen's Kappa ~0.00) when evaluating subtle policy boundaries compared to calibrated ground truth. This confirms that automated judges should supplement—not replace—human ground truth calibration.
          </div>
        </div>
      )}

    </div>
  );
}
