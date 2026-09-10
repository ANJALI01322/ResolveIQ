import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { fetchConversations } from '../api';

export default function ConversationsView({ onSelectConversationForAnalysis }) {
  const [data, setData] = useState({ items: [], total: 0, intents: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIntent, setSelectedIntent] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchConversations({
        intent: selectedIntent,
        search: search.trim(),
        page: page,
        pageSize: 12
      });
      setData(res);
      if (res.items.length > 0 && !selectedItem) {
        setSelectedItem(res.items[0]);
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedIntent, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadData();
  };

  const totalPages = Math.ceil((data.total || 1) / 12);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Historical Support Conversations
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Browse and inspect real customer inquiries and agent resolutions from the @AmazonHelp support archive.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="Search conversations by keywords (e.g., refund, late, prime, password)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ minWidth: '220px' }}>
            <select
              className="form-select"
              value={selectedIntent}
              onChange={(e) => {
                setSelectedIntent(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Support Intents ({data.total})</option>
              {data.intents?.map((int) => (
                <option key={int.id} value={int.id}>
                  {int.name} ({int.count})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
            Search Archive
          </button>
        </form>
      </div>

      {/* Main Grid: Conversation List on Left + Full Dialogue Inspector on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Column: List */}
        <div className="card" style={{ padding: '0' }}>
          <div style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Showing {data.items.length} of {data.total} Conversations
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
              Page {page} of {totalPages}
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading historical dialogues...
            </div>
          ) : data.items.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No conversations found matching query.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data.items.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    style={{
                      padding: '1rem 1.25rem',
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--bg-subtle)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span className="badge badge-intent" style={{ fontSize: '0.72rem' }}>
                        {item.intent_display}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: item.escalation_indicator ? 'var(--status-escalate-text)' : 'var(--status-pass-text)'
                      }}>
                        {item.escalation_indicator ? 'Escalation Precedent' : 'Self-Service Precedent'}
                      </span>
                    </div>

                    <div style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.customer_message}
                    </div>

                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      Agent: {item.agent_resolution}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          <div style={{
            padding: '0.85rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-subtle)',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              className="btn btn-secondary"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Page {page} / {totalPages || 1}
            </span>
            <button
              className="btn btn-secondary"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Complete Dialogue Turn Inspector */}
        {selectedItem ? (
          <div className="card" style={{ position: 'sticky', top: '80px' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title" style={{ margin: 0 }}>
                  Dialogue Inspector
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Case ID: {selectedItem.id}
                </span>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => onSelectConversationForAnalysis(selectedItem.customer_message)}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                Analyze in Hero <ExternalLink size={12} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Turn 1: Customer */}
              <div style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Customer Turn
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                    {selectedItem.channel}
                  </span>
                </div>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  "{selectedItem.customer_message}"
                </p>
              </div>

              {/* Turn 2: Agent Resolution */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--primary-darker)' }}>
                    @AmazonHelp Verified Resolution
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--primary-dark)' }}>
                    Historical Precedent
                  </span>
                </div>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-primary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{selectedItem.agent_resolution}"
                </p>
              </div>

              {/* Metadata */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <div><strong>Classified Intent:</strong> {selectedItem.intent_display}</div>
                <div><strong>Resolution Nature:</strong> {selectedItem.escalation_indicator ? 'Requires private account authentication or DM' : 'Self-service navigation guidance'}</div>
                <div><strong>Channel Source:</strong> Twitter Customer Support Dataset (TWCS)</div>
              </div>

            </div>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Select a conversation from the list to inspect full context.
          </div>
        )}

      </div>
    </div>
  );
}
