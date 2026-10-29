import { useState } from 'react';
import { useApiKey } from '../hooks/useApiKey.js';

function maskKey(key) {
  if (!key) return '';
  if (key.length <= 8) return '*'.repeat(key.length);
  return `${key.slice(0, 4)}••••${key.slice(-4)}`;
}

export default function ApiKeyBanner() {
  const { apiKey, hasConfiguredKey, setApiKey, clearApiKey } = useApiKey();
  const [tempKey, setTempKey] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!tempKey.trim()) {
      setStatus('Please enter a valid key.');
      return;
    }
    setApiKey(tempKey.trim(), 'manual');
    setTempKey('');
    setStatus('API key saved for this session.');
  };

  const handleClear = () => {
    clearApiKey();
    setStatus('API key cleared.');
  };

  return (
    <section className="rounded-xl border border-sky-700/60 bg-sky-900/30 p-4 text-sm text-sky-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold">
            Gemini API Key
            {hasConfiguredKey && (
              <span className="ml-2 rounded-full bg-sky-800 px-2 py-0.5 text-xs font-medium text-sky-100">
                Session key
              </span>
            )}
          </p>
          <p className="text-sky-200/80">
            Enter your own key for this browser session. Analysis sends image frames and prompts to Google Gemini and may incur charges. The key is sent to Google to authenticate requests; reloading this page clears it.
          </p>
          {hasConfiguredKey && (
            <p className="text-xs text-sky-200/70">Active key: {maskKey(apiKey)}</p>
          )}
          {status && <p className="text-xs text-sky-200/80">{status}</p>}
        </div>
        <form className="flex w-full max-w-md flex-col gap-2 md:flex-row" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter Gemini API key"
            value={tempKey}
            onChange={(event) => setTempKey(event.target.value)}
            className="w-full rounded-lg border border-sky-700 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white shadow hover:bg-sky-400"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-slate-500 px-3 py-2 text-sm font-medium text-slate-100 hover:border-slate-400"
              disabled={!hasConfiguredKey}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
