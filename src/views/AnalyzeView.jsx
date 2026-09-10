import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertTriangle, 
  UserCheck, 
  Clock, 
  Layers, 
  Tag, 
  Cpu, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { analyzeMessage } from '../api';
import { DecisionBadge, GroundingBadge, IntentBadge } from '../components/StatusBadge';

const PRESET_QUERIES = [
  { label: "Delayed Delivery", text: "I've been waiting for my refund and package for 10 days. Can someone check what's happening?" },
  { label: "Return QR Code", text: "How do I return this shirt and get a drop-off QR code for UPS or Kohl's?" },
  { label: "Duplicate Billing", text: "My card was charged twice for order 112-9847192-8172645. I need a refund immediately." },
  { label: "Cancel Order", text: "I ordered by mistake 5 minutes ago. How do I cancel before it ships?" },
  { label: "Kindle App Crash", text: "The Kindle app on my iPad keeps closing whenever I open my book library." }
];

export default function AnalyzeView({ initialQuery = "", onEvidenceClick }) {
  const [query, setQuery] = useState(initialQuery || PRESET_QUERIES[0].text);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expandedEvidence, setExpandedEvidence] = useState({});

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleAnalyze(initialQuery);
    }
  }, [initialQuery]);

  const handleAnalyze = async (textToAnalyze = query) => {
    if (!textToAnalyze || textToAnalyze.trim().length < 3) return;
    setLoading(true);
    setError(null);

    try {
      const data = await analyzeMessage(textToAnalyze.trim());
      setResult(data);
      // Default open the first evidence card
      if (data.evidence && data.evidence.length > 0) {
        setExpandedEvidence({ [data.evidence[0].id]: true });
      }
    } catch (err) {
      setError(err.message || "Failed to analyze message. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReply = () => {
    if (!result?.generated_reply) return;
    navigator.clipboard.writeText(result.generated_reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleEvidence = (id) => {
    setExpandedEvidence(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {/* Clinical Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Analyze Customer Message
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Run real-time intent understanding, hybrid evidence retrieval, claim verification, and automated escalation reasoning.
        </p>
      </div>

      {/* Hero Input Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem'
          }}>
            Incoming Customer Support Message
          </label>
          <textarea
            className="form-textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter or paste incoming customer message..."
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Preset scenario chips */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.25rem'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Quick Prompts:
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(preset.text);
                handleAnalyze(preset.text);
              }}
              disabled={loading}
              style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.28rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--bg-soft-accent)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Action Button & Loading Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            className="btn btn-primary"
            onClick={() => handleAnalyze()}
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="spin-icon" />
                Analyzing Pipeline...
              </>
            ) : (
              <>
                <Send size={16} />
                Analyze Message
              </>
            )}
          </button>

          {result?.latency_ms && !loading && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} /> Pipeline completed in {result.latency_ms}ms
            </span>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--status-escalate-bg)',
          border: '1px solid var(--status-escalate-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--status-escalate-text)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertTriangle size={20} />
          <div>
            <strong>Analysis Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Results Grid */}
      {result && !loading && (
        <div className="hero-analyze-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Decision & Generated Reply */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* 1. Escalation Decision Card */}
            <div className="card" style={{
              borderLeft: `5px solid ${result.decision.decision === 'SAFE_TO_AUTO_HANDLE' ? 'var(--primary)' : 'var(--status-escalate-text)'}`
            }}>
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h3 className="card-title" style={{ margin: 0 }}>
                    Automation Decision
                  </h3>
                  <DecisionBadge decision={result.decision.decision} />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: result.decision.risk_level === 'LOW' ? 'var(--status-pass-text)' : 'var(--status-escalate-text)'
                }}>
                  Risk: {result.decision.risk_level}
                </span>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
                  Reasoning & Rationale
                </strong>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {result.decision.reason}
                </p>
              </div>

              {/* Multi-Signal Breakdown */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Multi-Signal Risk Evaluation:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                  {result.decision.signals.map((sig, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.78rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <strong>{sig.signal}</strong>
                        <span style={{
                          fontWeight: 700,
                          color: sig.status === 'PASS' ? 'var(--status-pass-text)' : (sig.status === 'WARNING' ? 'var(--status-warning-text)' : 'var(--status-escalate-text)')
                        }}>
                          {sig.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                        {sig.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Proposed Customer Reply Card */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h3 className="card-title" style={{ margin: 0 }}>
                    Proposed Customer Reply
                  </h3>
                  <GroundingBadge status={result.grounding.status} score={result.grounding.grounding_score} />
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={handleCopyReply}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                >
                  {copied ? <Check size={14} color="var(--status-pass-text)" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy Reply'}
                </button>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.15rem',
                fontSize: '0.98rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-sans)'
              }}>
                {result.generated_reply}
              </div>

              {/* Grounding Verification Notes */}
              <div style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-subtle)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  Evidence Verification:
                </div>
                <div>{result.grounding.summary}</div>
                {result.grounding.unsupported_claims.length > 0 && (
                  <ul style={{ marginTop: '0.35rem', paddingLeft: '1.2rem', color: 'var(--status-escalate-text)' }}>
                    {result.grounding.unsupported_claims.map((un, idx) => (
                      <li key={idx}>{un}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Intent Understanding & Evidence Lineage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* 3. Intent Understanding Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <Tag size={18} color="var(--primary-dark)" />
                  Intent Classification
                </h3>
                <IntentBadge intentName={result.intent.display_name} confidence={result.intent.confidence} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600 }}>
                  <span>Model Confidence</span>
                  <span style={{ color: 'var(--primary-darker)' }}>{(result.intent.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="confidence-meter-bar">
                  <div
                    className="confidence-meter-fill"
                    style={{ width: `${Math.min(100, result.intent.confidence * 100)}%` }}
                  />
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {result.intent.description}
                </p>
              </div>

              {/* Alternative Intents */}
              {result.intent.alternatives && result.intent.alternatives.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                    Alternative Intent Candidates:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {result.intent.alternatives.map((alt, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>{alt.display_name}</span>
                        <strong>{(alt.confidence * 100).toFixed(1)}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Retrieved Historical Evidence Card */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title" style={{ margin: 0 }}>
                    <Layers size={18} color="var(--primary-dark)" />
                    Retrieved Support Evidence
                  </h3>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Pattern: {result.resolution_pattern}
                  </span>
                </div>
                <span className="badge badge-intent" style={{ fontSize: '0.75rem' }}>
                  {result.evidence.length} Precedents
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Historical Twitter support resolutions used to condition and ground the proposed response:
              </p>

              {/* Evidence Items */}
              {result.evidence.map((item, idx) => {
                const isOpen = !!expandedEvidence[item.id];
                return (
                  <div key={item.id} className="evidence-card">
                    <div
                      className="evidence-card-header"
                      onClick={() => toggleEvidence(item.id)}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', maxWidth: '85%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: 'var(--primary-darker)'
                          }}>
                            {item.id}
                          </span>
                          <span style={{
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            color: 'var(--text-muted)'
                          }}>
                            · {item.intent_display}
                          </span>
                        </div>
                        <div style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          "{item.customer_message}"
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          backgroundColor: 'var(--bg-soft-accent)',
                          borderRadius: 'var(--radius-pill)',
                          color: 'var(--primary-darker)'
                        }}>
                          {(item.similarity_score * 100).toFixed(0)}%
                        </span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isOpen && (
                      <div className="evidence-body">
                        <div style={{ marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Customer Problem:
                          </span>
                          <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                            "{item.customer_message}"
                          </p>
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary-dark)', textTransform: 'uppercase' }}>
                            Historical Agent Resolution:
                          </span>
                          <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '0.15rem', fontStyle: 'italic' }}>
                            "{item.historical_resolution}"
                          </p>
                        </div>

                        <div style={{
                          fontSize: '0.76rem',
                          color: 'var(--text-muted)',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '0.5rem',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span><strong>Relevance:</strong> {item.relevance_reason}</span>
                          <span style={{ fontFamily: 'var(--font-mono)' }}>
                            Sem: {(item.semantic_score * 100).toFixed(0)}% · Lex: {(item.lexical_score * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
