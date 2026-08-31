import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/search-input";
import SubmitButton from "../components/button-submit";
import FeatureCard from "../components/feature-card";
import QrModal from "../components/qr-modal";
import { useShortenUrl } from "../hooks/use-shorten-url";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { SlidersHorizontal, QrCode, Copy, Check, ExternalLink, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  const { shortUrl, result, isLoading, error, shortenUrl } = useShortenUrl();
  const { isCopied, copy } = useCopyToClipboard();

  useEffect(() => {
    document.title = "Smaller - Encurtador de URLs Rápido e Seguro";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await shortenUrl({
      url: urlInput,
      customCode: customCode || undefined,
      expiresAtUtc: expiresAt || undefined,
      maxClicks: maxClicks ? Number(maxClicks) : undefined,
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 sm:py-16 space-y-12 text-center">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Transforme Links Longos em{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            URLs Elegantes
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Encurte URLs instantaneamente com cache Redis de alta velocidade, slugs personalizados, expiração e QR Code nativo.
        </p>
      </section>

      {/* Form Card */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-lg relative z-20 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4" id="shorten-form">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              id="url-input"
              placeholder="Cole sua URL aqui (ex: https://meusite.com/artigo-longo)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onClear={() => setUrlInput("")}
            />
            <SubmitButton id="btn-shorten" isLoading={isLoading}>Encurtar</SubmitButton>
          </div>

          {/* Toggle Advanced Options */}
          <div className="text-left">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showAdvanced ? "Ocultar opções avançadas" : "Opções avançadas (Alias, Expiração, Limites)"}
            </button>
          </div>

          {/* Advanced Options Accordion */}
          {showAdvanced && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Slug Customizado</label>
                <input
                  type="text"
                  placeholder="ex: blackfriday"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Data de Expiração</label>
                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Limite de Cliques</label>
                <input
                  type="number"
                  min="1"
                  placeholder="ex: 100"
                  value={maxClicks}
                  onChange={(e) => setMaxClicks(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </form>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-left flex items-center gap-2" role="alert">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Result Area */}
        {shortUrl && (
          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Sua URL encurtada:
              </span>
              <div className="flex items-center gap-2">
                {result?.isCustom && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Slug Customizado
                  </span>
                )}
                {result?.maxClicks && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Max: {result.maxClicks} cliques
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                id="short-url-result"
                type="text"
                readOnly
                value={shortUrl}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300 font-mono text-sm focus:outline-none"
              />

              <div className="flex gap-2 shrink-0">
                <button
                  id="btn-copy-url"
                  type="button"
                  onClick={() => copy(shortUrl)}
                  className={`btn btn-sm font-medium rounded-lg border-0 px-4 text-white transition-colors flex items-center gap-1.5 ${
                    isCopied ? "bg-emerald-600 hover:bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? "Copiado" : "Copiar"}
                </button>

                <button
                  id="btn-qr-modal"
                  type="button"
                  onClick={() => setIsQrOpen(true)}
                  className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg px-3 flex items-center gap-1.5"
                  title="Gerar QR Code"
                >
                  <QrCode className="w-4 h-4" />
                  QR Code
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-200 flex items-center gap-1 underline underline-offset-4"
              >
                Abrir em nova aba <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                to={`/dashboard?url=${encodeURIComponent(shortUrl)}`}
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <BarChart3 className="w-3.5 h-3.5" /> Ver Analytics →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <FeatureCard
          icon={<Zap className="w-5 h-5 text-indigo-400" />}
          title="Alta Velocidade"
          description="Cache de leitura com Redis e processamento assíncrono para respostas em sub-milissegundos."
        />
        <FeatureCard
          icon={<BarChart3 className="w-5 h-5 text-indigo-400" />}
          title="Analytics Detalhado"
          description="Métricas em tempo real por dispositivo, navegador, sistema operacional e histórico diário."
        />
        <FeatureCard
          icon={<ShieldCheck className="w-5 h-5 text-indigo-400" />}
          title="Segurança & Limites"
          description="Rate Limiting nativo do .NET 8 e suporte a expiração programada de links."
        />
      </section>

      {/* QR Code Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} url={shortUrl} code={result?.code} />
    </div>
  );
}
