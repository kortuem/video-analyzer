import { version } from '../../package.json';

export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold text-slate-100">AI Video Analyzer</h1>
      <p className="text-xs text-amber-200">v{version} · Early experimental prototype</p>
      <p className="text-sm text-slate-300">
        Upload a video, analyze frames with Gemini, and explore multiple professional perspectives.
      </p>
    </header>
  );
}
