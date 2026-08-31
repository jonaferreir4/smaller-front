import { useState, useCallback } from "react";
import { api } from "../services/axios";
import type { UrlInsightsResponse } from "../types/api";

export function useUrlInsights() {
  const [insights, setInsights] = useState<UrlInsightsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = useCallback(async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Por favor, insira o código ou a URL encurtada.");
      return;
    }

    let code = trimmed;
    try {
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        const urlObj = new URL(trimmed);
        code = urlObj.pathname.split("/").filter(Boolean).pop() || trimmed;
      }
    } catch {
      // Se não for URL parseável, usamos o próprio texto como código
    }

    setIsLoading(true);
    setError("");
    setInsights(null);

    try {
      const response = await api.get<UrlInsightsResponse>(`/links/${code}`);
      setInsights(response.data);
    } catch (err: unknown) {
      console.error(err);
      setError("Não foi possível encontrar estatísticas para esta URL. Verifique o código informado.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { insights, isLoading, error, fetchInsights };
}
