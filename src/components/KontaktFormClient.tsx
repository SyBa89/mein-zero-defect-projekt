'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import Link from 'next/link';

export default function KontaktFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // ✅ SECURITY: Unsichtbares Feld für Anti-Spam
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      setIsSuccess(false);
      setApiError('');
    }
  }, [formData.name, formData.email, formData.message]);

  useEffect(() => {
    if ((isSuccess || apiError) && successRef.current) {
      successRef.current.focus();
    }
  }, [isSuccess, apiError]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const trimmedName = formData.name.trim();
    if (!trimmedName) newErrors.name = 'Bitte geben Sie Ihren Namen ein.';
    else if (trimmedName.length < 2 || trimmedName.length > 100)
      newErrors.name = 'Der Name muss zwischen 2 und 100 Zeichen lang sein.';

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail) newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
    else if (!emailRegex.test(trimmedEmail))
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) newErrors.message = 'Bitte geben Sie eine Nachricht ein.';
    else if (trimmedMessage.length < 10 || trimmedMessage.length > 2000)
      newErrors.message = 'Die Nachricht muss zwischen 10 und 2000 Zeichen lang sein.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setErrors({});
      } else {
        setApiError(
          data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
        );
      }
    } catch {
      setApiError(
        'Ein Verbindungsfehler ist aufgetreten. Bitte prüfen Sie Ihre Internetverbindung.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Kontaktieren Sie uns
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Haben Sie eine Frage, ein Anliegen oder möchten Sie uns etwas mitteilen? Wir sind für Sie
          da.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Linke Spalte: Kontaktdaten */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Direkter Kontakt</h2>
            <ul className="space-y-4">
              <li>
                <a href="tel:+4922359291160" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Telefon</p>
                    <p className="text-gray-900 font-semibold group-hover:text-pink-600 transition-colors">
                      02235 9291160
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@kiosk-lollipop.de" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">E-Mail</p>
                    <p className="text-gray-900 font-semibold group-hover:text-pink-600 transition-colors break-all">
                      info@kiosk-lollipop.de
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <Link href="/" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                    <svg
                      className="w-5 h-5 text-pink-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Adresse</p>
                    <p className="text-gray-900 font-semibold group-hover:text-pink-600 transition-colors">
                      Theodor-Heuss-Str. 35
                      <br />
                      50374 Erftstadt
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-100">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span aria-hidden="true">🕒</span> Öffnungszeiten
            </h3>
            <p className="text-sm text-gray-700 mb-1">Mo - Fr: 07:30 - 19:00 Uhr</p>
            <p className="text-sm text-gray-700 mb-1">Samstag: 07:30 - 14:30 Uhr</p>
            <p className="text-sm text-red-600 font-medium">So & Feiertags: Geschlossen</p>
          </div>
        </div>

        {/* Rechte Spalte: Formular */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            {isSuccess && (
              <div
                ref={successRef}
                tabIndex={-1}
                className="mb-6 bg-green-50 text-green-800 p-5 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                aria-live="polite"
                role="status"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-green-900 text-base mb-1">
                      Nachricht erfolgreich gesendet!
                    </p>
                    <p className="text-sm text-green-800 leading-relaxed">
                      Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen
                      melden.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {apiError && (
              <div
                ref={successRef}
                tabIndex={-1}
                className="mb-6 bg-red-50 text-red-800 p-5 rounded-xl border border-red-200 outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                aria-live="assertive"
                role="alert"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-red-900 text-base mb-1">Senden fehlgeschlagen</p>
                    <p className="text-sm text-red-800 leading-relaxed">{apiError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] -top-[9999px] opacity-0"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  Ihr Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 ${errors.name ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  placeholder="Max Mustermann"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Ihre E-Mail-Adresse <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 ${errors.email ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  placeholder="max@beispiel.de"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                  Ihre Nachricht <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 resize-none ${errors.message ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  placeholder="Wie können wir Ihnen helfen?"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Nachricht jetzt absenden
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed flex items-center justify-center gap-1">
                <span aria-hidden="true">🔒</span> Datenschutzfreundlich: Ihre Nachricht wird sicher
                verarbeitet.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
