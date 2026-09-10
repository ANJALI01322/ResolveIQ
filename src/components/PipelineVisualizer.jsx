import React from 'react';
import { 
  MessageSquare, 
  Tag, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  GitFork, 
  ArrowRight 
} from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 1, title: 'Customer Query', desc: 'Raw support turn intake', icon: MessageSquare },
  { id: 2, title: 'Intent Classification', desc: '10-class calibrated taxonomy', icon: Tag },
  { id: 3, title: 'Hybrid Retrieval', desc: 'BM25 lexical + TF-IDF semantic', icon: Layers },
  { id: 4, title: 'Grounded Reply', desc: 'Precedent-conditioned synthesis', icon: Cpu },
  { id: 5, title: 'Claim Verification', desc: 'Unsupported statement audit', icon: ShieldCheck },
  { id: 6, title: 'Escalation Engine', desc: 'Multi-signal risk decision', icon: GitFork }
];

export default function PipelineVisualizer({ activeStep = 0 }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--primary-dark)'
          }}>
            Architecture Pipeline
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            · Clinical & Grounded AI Support Reasoning
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
        position: 'relative'
      }}>
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStep === step.id;

          return (
            <div
              key={step.id}
              style={{
                backgroundColor: isCurrent ? 'var(--bg-subtle)' : 'var(--bg-surface-elevated)',
                border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                transition: 'all 0.2s ease',
                boxShadow: isCurrent ? 'var(--shadow-cyan)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? 'var(--primary)' : 'var(--bg-soft-accent)',
                  color: isCurrent ? '#FFFFFF' : 'var(--primary-dark)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step.id}
                </span>
                <Icon size={16} color={isCurrent ? 'var(--primary-dark)' : 'var(--text-muted)'} />
              </div>

              <div style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '0.86rem',
                color: isCurrent ? 'var(--primary-darker)' : 'var(--text-primary)'
              }}>
                {step.title}
              </div>

              <div style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                lineHeight: 1.3
              }}>
                {step.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
