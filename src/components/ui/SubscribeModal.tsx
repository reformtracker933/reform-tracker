"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: "newsletter" | "navbar" | "mobile-nav";
  showNameField?: boolean;
  initialEmail?: string;
}

export default function SubscribeModal({
  isOpen,
  onClose,
  source,
  showNameField = true,
  initialEmail = "",
}: SubscribeModalProps) {
  const { getTranslation } = useLocale();
  const modalText = getTranslation("subscribeModal");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial email when modal opens
  useEffect(() => {
    if (isOpen && initialEmail) {
      setEmail(initialEmail);
    }
  }, [isOpen, initialEmail]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail("");
        setName("");
        setStatus("idle");
        setErrorMessage("");
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          source,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus("error");
        // Map error messages to translations
        if (data.error?.includes("already subscribed")) {
          setErrorMessage(modalText.errorAlreadySubscribed);
        } else if (data.error?.includes("email")) {
          setErrorMessage(modalText.errorInvalidEmail);
        } else {
          setErrorMessage(modalText.errorGeneric);
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage(modalText.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-999 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-lg p-8 md:p-10 pt-8 md:pt-8 animate-scale-in z-10 my-auto">
        {status === "success" ? (
          // Success State
          <>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                {modalText.successTitle}
              </h3>
              <p className="text-base text-neutral-600">
                {modalText.successMessage}
              </p>
            </div>
          </>
        ) : (
          // Form State
          <>
            {/* Header with Title and Close Button */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1 pr-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  {modalText.title}
                </h2>
                <p className="text-base text-neutral-600">
                  {modalText.description}
                </p>
              </div>
              {/* Close Button */}
              <button
                onClick={onClose}
                className=" text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-neutral-700 mb-2.5"
                >
                  {modalText.emailLabel}{" "}
                  <span className="text-red-500">
                    {modalText.emailRequired}
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={modalText.emailPlaceholder}
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-neutral-300 focus:border-primary focus:outline-none transition-colors text-neutral-800 text-base"
                />
              </div>

              {showNameField && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-neutral-700 mb-2.5"
                  >
                    {modalText.nameLabel}{" "}
                    <span className="text-neutral-400">
                      {modalText.nameOptional}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={modalText.namePlaceholder}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-neutral-300 focus:border-primary focus:outline-none transition-colors text-neutral-800 text-base"
                  />
                </div>
              )}

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base mt-8"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {modalText.subscribing}
                  </>
                ) : (
                  modalText.subscribeButton
                )}
              </button>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}
