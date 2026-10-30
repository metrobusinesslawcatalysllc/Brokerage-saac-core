import React, { useState } from 'react';

// Multi-tier role definitions
type Role = 'SUPER_MASTER' | 'BROKER_ADMIN' | 'SUB_ADMIN' | 'CLIENT';

interface Account {
  id: string;
  clientName: string;
  balance: number;
  equity: number;
  allocatedFund: number;
  status: 'Active' | 'Paused' | 'Pending';
}

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>('CLIENT');
  const [activeTab, setActiveTab] = useState<'overview' | 'trading' | 'management'>('overview');
  
  // Simulated state for demonstration
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 'ACC-1001', clientName: 'John Doe', balance: 25000, equity: 26450, allocatedFund: 15000, status: 'Active' },
    { id: 'ACC-1002', clientName: 'Sarah Smith', balance: 50000, equity: 48900, allocatedFund: 30000, status: 'Active' },
    { id: 'ACC-1003', clientName: 'Metro Capital', balance: 125000, equity: 131200, allocatedFund: 100000, status: 'Active' },
  ]);

  const [tradeSymbol, setTradeSymbol] = useState('EUR/USD');
  const [tradeAmount, setTradeAmount] = useState(1000);

  const handleSimulateTrade = (type: 'BUY' | 'SELL') => {
    alert(`${type} order executed for ${tradeAmount} ${tradeSymbol} successfully!`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header / Role Switcher */}
      <header style={{ borderBottom: '1px solid #334155', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#38bdf8' }}>Brokerage SAAC Core</h1>
          <span style={{ fontSize: '12px', background: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>Supabase Connected</span>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#1e293b', padding: '4px', borderRadius: '8px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', paddingLeft: '8px' }}>View Mode:</span>
          {(['CLIENT', 'SUB_ADMIN', 'BROKER_ADMIN', 'SUPER_MASTER'] as Role[]).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              style={{
                background: activeRole === role ? '#0284c7' : 'transparent',
                color: activeRole === role ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #334155', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: activeTab === 'overview' ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === 'overview' ? '2px solid #38bdf8' : 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('trading')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: activeTab === 'trading' ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === 'trading' ? '2px solid #38bdf8' : 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Execution Terminal
          </button>

          {activeRole !== 'CLIENT' && (
            <button
              onClick={() => setActiveTab('management')}
              style={{
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                color: activeTab === 'management' ? '#38bdf8' : '#94a3b8',
                borderBottom: activeTab === 'management' ? '2px solid #38bdf8' : 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Fund Allocations & Risk
            </button>
          )}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Total Portfolio Value</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#22c55e' }}>$200,000.00</div>
              </div>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Allocated Capital</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#38bdf8' }}>$145,000.00</div>
              </div>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Floating P&L</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#22c55e' }}>+$6,550.00</div>
              </div>
            </div>

            {/* Client / Manager Access Notice */}
            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
              <h3 style={{ marginTop: 0 }}>Active Role Permissions</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                Currently operating as <strong>{activeRole.replace('_', ' ')}</strong>. 
                {activeRole === 'CLIENT' && ' You have view-only access to portfolio balances and transaction history.'}
                {activeRole !== 'CLIENT' && ' You have full operational control over account allocations and trade execution.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Execution Terminal */}
        {activeTab === 'trading' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', minHeight: '300px' }}>
              <h3 style={{ marginTop: 0 }}>Market Chart Simulator</h3>
              <div style={{ height: '220px', background: '#0f172a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                [ Real-time TradingView / Price Feed Widget ]
              </div>
            </div>

            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
              <h3 style={{ marginTop: 0 }}>Order Execution</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Symbol</label>
                <select 
                  value={tradeSymbol} 
                  onChange={(e) => setTradeSymbol(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}
                >
                  <option value="EUR/USD">EUR / USD</option>
                  <option value="GBP/USD">GBP / USD</option>
                  <option value="BTC/USD">BTC / USD</option>
                  <option value="XAU/USD">XAU / USD (Gold)</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Volume (USD)</label>
                <input 
                  type="number" 
                  value={tradeAmount} 
                  onChange={(e) => setTradeAmount(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button 
                  onClick={() => handleSimulateTrade('BUY')}
                  style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  BUY
                </button>
                <button 
                  onClick={() => handleSimulateTrade('SELL')}
                  style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Management */}
        {activeTab === 'management' && activeRole !== 'CLIENT' && (
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
            <h3 style={{ marginTop: 0 }}>Client Account Allocations</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '12px' }}>Account ID</th>
                  <th style={{ padding: '12px' }}>Client</th>
                  <th style={{ padding: '12px' }}>Balance</th>
                  <th style={{ padding: '12px' }}>Equity</th>
                  <th style={{ padding: '12px' }}>Allocated Fund</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{acc.id}</td>
                    <td style={{ padding: '12px' }}>{acc.clientName}</td>
                    <td style={{ padding: '12px' }}>${acc.balance.toLocaleString()}</td>
                    <td style={{ padding: '12px', color: '#22c55e' }}>${acc.equity.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>${acc.allocatedFund.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: '#065f46', color: '#34d399', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {acc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
