import { useState } from "react";
import SearchInput from "../components/search-input";
import SubmitButton from "../components/button-submit";
import { api } from "../services/axios";

type UrlInsights = {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdOnUtc: string;
};

export default function Dashboard() {
  const [shortUrlInput, setShortUrlInput] = useState("");
  const [insights, setInsights] = useState<UrlInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!shortUrlInput.trim()) {
      setError("Por favor, insira uma URL encurtada");
      return;
    }

    setIsLoading(true);
    setError("");
    setInsights(null);

    try {
      const UrlObject = new URL(shortUrlInput);
      const code = UrlObject.pathname.split("/").pop();
      const response = await api.get(`/links/${code}`);
      console.log(response.data);
      setInsights(response.data);
    } catch (err) {
      setError("Falha ao buscar insights. Verifique a URL e tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Insights da URL</h1>
      <p className="mb-8 text-lg">
        Cole sua URL encurtada para ver estatísticas e informações
      </p>

      <form onSubmit={fetchInsights} className="flex items-center gap-2 mb-8">
        <SearchInput
          placeholder="Cole sua URL encurtada aqui (ex: https://short.url/abc123)"
          value={shortUrlInput}
          onChange={(e) => setShortUrlInput(e.target.value)}
        />
        <SubmitButton disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar Insights"}
        </SubmitButton>
      </form>

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {insights && (
        <div className="bg-base-100 rounded-lg shadow-md p-6">
          <div className="flex justify-around items-center">
            <div className="max-w-lg">
              <h2 className="text-xl font-semibold mb-4">
                Informações Básicas
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">URL Original:</p>
                  <p className="text-info break-words break-all">{insights.originalUrl}</p>
                </div>
                <div>
                  <p className="font-medium">URL Encurtada:</p>
                  <a
                    href={insights.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-info"
                  >
                    {insights.shortUrl}
                  </a>
                </div>
                <div>
                  <p className="font-medium">Criada em:</p>
                  <p>{insights.createdOnUtc}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total de Cliques</div>
                  <div className="stat-value text-primary">
                    {insights.clicks}
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
