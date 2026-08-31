import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/search-input";
import SubmitButton from "../components/button-submit";
import FeatureCard from "../components/feature-card";
import QrModal from "../components/qr-modal";
import { useShortenUrl } from "../hooks/use-shorten-url";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [isQrOpen, setIsQrOpen] = useState(false);

  const { shortUrl, isLoading, error, shortenUrl } = useShortenUrl();
  const { isCopied, copy } = useCopyToClipboard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await shortenUrl(urlInput);
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
          Cole seu link longo abaixo para gerar uma URL curta e acompanhar suas estatísticas de cliques.
        </p>
      </section>

      {/* Form Card */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-lg relative z-20">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            placeholder="Cole sua URL aqui (ex: https://meusite.com/link-longo)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onClear={() => setUrlInput("")}
          />
          <SubmitButton isLoading={isLoading}>Encurtar</SubmitButton>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-left flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Result Area */}
        {shortUrl && (
          <div className="mt-6 p-5 rounded-xl bg-slate-950/90 border border-slate-800 text-left space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Sua URL encurtada:
            </span>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300 font-mono text-sm focus:outline-none"
              />

              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copy(shortUrl)}
                  className={`btn btn-sm font-medium rounded-lg border-0 px-4 text-white transition-colors ${
                    isCopied ? "bg-emerald-600 hover:bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {isCopied ? "✓ Copiado" : "Copiar"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsQrOpen(true)}
                  className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg px-3"
                  title="Gerar QR Code"
                >
                  QR Code
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-200 underline underline-offset-4"
              >
                Abrir em nova aba ↗
              </a>
              <Link
                to={`/dashboard?url=${encodeURIComponent(shortUrl)}`}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Ver estatísticas →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <FeatureCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          title="Links Diretos"
          description="Geração de URLs curtas e limpas para compartilhamento simplificado."
        />
        <FeatureCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          title="Contagem de Cliques"
          description="Acompanhe o total de acessos do seu link diretamente pelo Dashboard."
        />
        <FeatureCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          title="Validação Segura"
          description="Sanitização automática de entrada para garantir redirecionamentos confiáveis."
        />
      </section>

      {/* QR Code Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} url={shortUrl} />
    </div>
  );
}
