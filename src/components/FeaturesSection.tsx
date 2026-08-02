import { CLIENT_CONFIG } from '@/lib/client.config';
import { StaggerContainer, StaggerItem } from './motion/FadeInWhenVisible';
import FadeInWhenVisible from './motion/FadeInWhenVisible';

export default function FeaturesSection() {
  const { features } = CLIENT_CONFIG;

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Warum Kunden zu uns kommen
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Mehr als nur ein Kiosk - wir sind Ihr Nachbar mit echtem Service
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.15}
        >
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
