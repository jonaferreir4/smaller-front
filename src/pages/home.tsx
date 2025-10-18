import { api } from "../services/axios";
import { useState } from "react";
import SearchInput from "../components/search-input";
import SubmitButton from "../components/button-submit";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ textCopy, setTextCopy ] = useState("Copiar");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await api.post("/shorten", { url });
      setShortUrl(response.data.shortUrl);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
      ) {
        // @ts-expect-error: AxiosError typing
        setError(err.response.data || "An error occurred while shortening the URL.");
      } else {
        setError("An error occurred while shortening the URL.");
      }
    } finally {
      setIsLoading(false);
    }
  };

 const copyToClipboard = async () => {
  if (shortUrl) {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(shortUrl);
        setTextCopy("Copiado");
        setTimeout(() => setTextCopy("Copiar"), 2000);
    }
  }
};

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-8">Encurte sua URL</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex gap-2">
          <SearchInput
            placeholder="Enter your long URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <SubmitButton disabled={isLoading}>
            {isLoading ? "Encurtando..." : "Encurtar"}
          </SubmitButton>
        </div>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {shortUrl && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-2">Sua URL encurtada:</h2>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="input input-bordered w-full"
            />
            <button onClick={copyToClipboard} className="btn btn-success">
              {textCopy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
