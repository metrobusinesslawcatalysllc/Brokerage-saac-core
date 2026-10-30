import { useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function App() {
  const [ready, setReady] = useState(true);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Brokerage SAAC Core</h1>
      <p>Supabase URL: {supabaseUrl}</p>
      <p>Connected and ready.</p>
    </div>
  );
}

export default App;
