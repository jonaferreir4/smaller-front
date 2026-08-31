import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/search-input";
import SubmitButton from "../components/button-submit";
import { useUrlInsights } from "../hooks/use-url-insights";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [shortUrlInput, setShortUrlInput] = useState("");
  const { insights, isLoading, error, fetchInsights } = useUrlInsights();
  const { isCopied, copy } = useCopyToClipboard();

  useEffect(() => {
    document.title = "Dashboard & Insights - Smaller";
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

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Estatísticas da{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            URL
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          Informe sua URL encurtada ou código para consultar a contagem de cliques e os dados de origem.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" id="insights-form">
          <SearchInput
            id="insights-url-input"
            placeholder="Cole sua URL encurtada ou código (ex: abc123)"
            value={shortUrlInput}
            onChange={(e) => setShortUrlInput(e.target.value)}
            onClear={() => setShortUrlInput("")}
          />
          <SubmitButton id="btn-search-insights" isLoading={isLoading}>Buscar</SubmitButton>
        </form>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2" role="alert">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Insights Content Card */}
      {insights && (
        <div className="space-y-6">
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-indigo-500/30 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Total de Cliques</span>
              <div className="text-3xl font-extrabold text-white tracking-tight">{insights.clicks}</div>
              <span className="text-[11px] text-slate-400">Acessos registrados</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Status</span>
              <div className="text-lg font-bold text-emerald-400 flex items-center justify-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Ativa
              </div>
              <span className="text-[11px] text-slate-500">Pronta para redirecionar</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Criada Em</span>
              <div className="text-sm font-semibold text-slate-200 pt-1">
                {new Date(insights.createdOnUtc).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <span className="text-[11px] text-slate-500">Data em formato UTC</span>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
              Informações do Link
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                  URL Original:
                </label>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <p className="text-slate-200 font-mono break-all leading-relaxed text-xs sm:text-sm">
                    {insights.originalUrl}
                  </p>
                  <a
                    href={insights.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Abrir URL Original"
                  >
                    ↗
                  </a>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                  URL Encurtada:
                </label>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-indigo-300 font-mono font-semibold break-all text-xs sm:text-sm">
                    {insights.shortUrl}
                  </span>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => copy(insights.shortUrl)}
                      className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
                    >
                      {isCopied ? "✓ Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
