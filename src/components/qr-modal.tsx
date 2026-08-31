import { cn } from "../lib/utils";
import { Download, X } from "lucide-react";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  code?: string;
}

export function QrModal({ isOpen, onClose, url, code }: QrModalProps) {
  if (!isOpen) return null;

  const extractCode = (shortUrl: string) => {
    try {
      const u = new URL(shortUrl);
      return u.pathname.split("/").filter(Boolean).pop() || "";
    } catch {
      return shortUrl;
    }
  };

  const shortCode = code || extractCode(url);
  const qrCodeEndpoint = shortCode ? `/api/links/${shortCode}/qrcode` : `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=6366f1&bgcolor=0f172a`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={cn(
          "relative w-full max-w-sm p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-center space-y-4"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-100">QR Code da URL</h3>
        <p className="text-xs text-slate-400 break-all px-2 font-mono">{url}</p>

        <div className="flex justify-center p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
          <img
            src={qrCodeEndpoint}
            alt="QR Code da URL Encurtada"
            className="w-48 h-48 rounded-lg shadow-md bg-white p-2"
            loading="lazy"
          />
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <a
            href={qrCodeEndpoint}
            download={`qrcode-${shortCode || "url"}.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm bg-indigo-600 hover:bg-indigo-500 text-white border-0 rounded-lg px-4 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar PNG
          </a>
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost text-slate-400 hover:text-slate-200 rounded-lg px-4"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrModal;
