import { cn } from "../lib/utils";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function QrModal({ isOpen, onClose, url }: QrModalProps) {
  if (!isOpen) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=6366f1&bgcolor=0f172a`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={cn(
          "relative w-full max-w-sm p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-center space-y-4"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Fechar modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold text-slate-100">QR Code da URL</h3>
        <p className="text-xs text-slate-400 break-all px-2">{url}</p>

        <div className="flex justify-center p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
          <img
            src={qrCodeUrl}
            alt="QR Code da URL Encurtada"
            className="w-48 h-48 rounded-lg shadow-md"
            loading="lazy"
          />
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <a
            href={qrCodeUrl}
            download="smaller-qr-code.png"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm bg-indigo-600 hover:bg-indigo-500 text-white border-0 rounded-lg px-4"
          >
            Baixar QR Code
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
