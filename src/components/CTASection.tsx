import { CLIENT_CONFIG } from '@/lib/client.config';

export default function CTASection() {
  const { contact } = CLIENT_CONFIG;
  const phoneFormatted = contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2');

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-6">
          Besuchen Sie uns!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          {contact.address.street}, {contact.address.zip} {contact.address.city}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Wir freuen uns auf Ihren Besuch!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            Exakte Route planen
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-gray-200 dark:border-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {phoneFormatted}
          </a>
        </div>
      </div>
    </section>
  );
}
