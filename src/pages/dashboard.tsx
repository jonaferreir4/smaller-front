import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/search-input";
import SubmitButton from "../components/button-submit";
import QrModal from "../components/qr-modal";
import { useUrlInsights } from "../hooks/use-url-insights";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { BarChart3, Smartphone, Monitor, Tablet, Globe, Calendar, ExternalLink, QrCode, Copy, Check, ShieldAlert } from "lucide-react";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [shortUrlInput, setShortUrlInput] = useState("");
  const [isQrOpen, setIsQrOpen] = useState(false);
  const { analytics, isLoading, error, fetchInsights } = useUrlInsights();
  const { isCopied, copy } = useCopyToClipboard();

  useEffect(() => {
    document.title = "Dashboard & Analytics - Smaller";
    const urlFromQuery = searchParams.get("url");
    if (urlFromQuery) {
      setShortUrlInput(urlFromQuery);
      fetchInsights(urlFromQuery);
    }
  }, [searchParams, fetchInsights]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchInsights(shortUrlInput);
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4 text-indigo-400" />;
      case "tablet":
        return <Tablet className="w-4 h-4 text-purple-400" />;
      default:
        return <Monitor className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Dashboard de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Analytics
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          Consulte estatísticas detalhadas de acessos por dispositivo, navegador e SO do seu link.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" id="insights-form">
          <SearchInput
            id="insights-url-input"
            placeholder="Cole sua URL encurtada ou código (ex: blackfriday)"
            value={shortUrlInput}
            onChange={(e) => setShortUrlInput(e.target.value)}
            onClear={() => setShortUrlInput("")}
          />
          <SubmitButton id="btn-search-insights" isLoading={isLoading}>Buscar Analytics</SubmitButton>
        </form>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2" role="alert">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Analytics Content Grid */}
      {analytics && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-indigo-500/30 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center justify-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> Total de Cliques
              </span>
              <div className="text-3xl font-extrabold text-white tracking-tight">{analytics.totalClicks}</div>
              <span className="text-[11px] text-slate-400">Acessos únicos registrados</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Código do Link</span>
              <div className="text-lg font-bold text-emerald-400 font-mono pt-1">
                {analytics.code}
              </div>
              <span className="text-[11px] text-slate-500">Identificador ativo</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dispositivo Dominante</span>
              <div className="text-base font-bold text-purple-300 flex items-center justify-center gap-1.5 pt-1">
                {getDeviceIcon(Object.keys(analytics.topDeviceTypes)[0] || "Desktop")}
                {Object.keys(analytics.topDeviceTypes)[0] || "Desktop"}
              </div>
              <span className="text-[11px] text-slate-500">Origem com maior volume</span>
            </div>
          </div>

          {/* Detailed Info Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" /> Detalhes do Link
              </h3>
              <button
                onClick={() => setIsQrOpen(true)}
                className="btn btn-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-md px-2.5 flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" /> Ver QR Code
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                  URL Original:
                </label>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <p className="text-slate-200 font-mono break-all text-xs">
                    {analytics.originalUrl}
                  </p>
                  <a
                    href={analytics.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Abrir URL Original"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                  URL Encurtada:
                </label>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-indigo-300 font-mono font-semibold break-all text-xs">
                    {analytics.shortUrl}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(analytics.shortUrl)}
                    className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shrink-0 flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Devices */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                <Monitor className="w-4 h-4 text-indigo-400" /> Dispositivos
              </h4>
              <div className="space-y-2">
                {Object.entries(analytics.topDeviceTypes).map(([device, count]) => {
                  const percent = Math.round((count / (analytics.totalClicks || 1)) * 100);
                  return (
                    <div key={device} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span className="flex items-center gap-1.5">
                          {getDeviceIcon(device)} {device}
                        </span>
                        <span className="font-semibold text-slate-400">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Browsers */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                <Globe className="w-4 h-4 text-purple-400" /> Navegadores
              </h4>
              <div className="space-y-2">
                {Object.entries(analytics.topBrowsers).map(([browser, count]) => {
                  const percent = Math.round((count / (analytics.totalClicks || 1)) * 100);
                  return (
                    <div key={browser} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>{browser}</span>
                        <span className="font-semibold text-slate-400">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Operating Systems */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> Sistemas Operacionais
              </h4>
              <div className="space-y-2">
                {Object.entries(analytics.topOperatingSystems).map(([os, count]) => {
                  const percent = Math.round((count / (analytics.totalClicks || 1)) * 100);
                  return (
                    <div key={os} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>{os}</span>
                        <span className="font-semibold text-slate-400">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* QR Code Modal */}
          <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} url={analytics.shortUrl} code={analytics.code} />
        </div>
      )}
    </div>
  );
}
