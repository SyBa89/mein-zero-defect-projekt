import { CLIENT_CONFIG } from '@/lib/client.config';

export default function ServicesSection() {
  const { services } = CLIENT_CONFIG;

  // White-Label: Wenn keine Services definiert sind, zeige nichts
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="text-3xl mb-2" aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{service.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
