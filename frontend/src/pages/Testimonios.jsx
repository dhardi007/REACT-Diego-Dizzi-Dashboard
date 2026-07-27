// Testimonios.jsx - Testimonials Carousel
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, User, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'CEO en TechStart',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    text: 'Esta plataforma transformó completamente cómo gestionamos nuestros proyectos. La interfaz es intuitiva y el equipo de soporte es excepcional.',
    rating: 5,
    company: 'TechStart',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    text: 'La mejor herramienta de gestión de proyectos que he usado en 10 años de carrera. Simple, potente y hermosa.',
    rating: 5,
    company: 'DevCorp',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    text: 'Finalmente una herramienta que entiende cómo trabajan los equipos reales. La vista de progreso y los favoritos son game-changers.',
    rating: 5,
    company: 'InnovateLab',
  },
  {
    id: 4,
    name: 'Diego Torres',
    role: 'CTO en ScaleUp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    text: 'Implementamos esto en todo el departamento de ingeniería. La curva de aprendizaje es casi cero y la adopción fue inmediata.',
    rating: 5,
    company: 'ScaleUp',
  },
  {
    id: 5,
    name: 'Laura Fernández',
    role: 'Diseñadora UX/UI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    text: 'Como diseñadora, aprecio profundamente la atención al detalle. Los micro-interactions, la tipografía, los espacios... todo respira calidad.',
    rating: 5,
    company: 'DesignStudio',
  },
];

function Testimonios() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goTo = (index) => setCurrentIndex(index);

  // Auto-play
  // useEffect(() => {
  //   if (!autoPlay) return;
  //   const interval = setInterval(next, 5000);
  //   return () => clearInterval(interval);
  // }, [autoPlay, currentIndex]);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 2xl:px-8">
      {/* Header */}
      <div className="mb-12 2xl:mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm 2xl:text-base font-medium mb-4 2xl:mb-6">
          <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5" />
          Lo que dicen nuestros usuarios
        </div>
        <h1 className="text-3xl sm:text-5xl 2xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 2xl:mb-6">
          Historias de éxito de <span className="text-primary">equipos reales</span>
        </h1>
        <p className="text-lg 2xl:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl 2xl:max-w-4xl mx-auto">
          Miles de equipos confían en nuestra plataforma para organizar su trabajo y lograr más.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-5xl 2xl:max-w-7xl mx-auto mb-16 2xl:mb-24">
        <div className="relative overflow-hidden rounded-2xl 2xl:rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4 2xl:px-8">
                <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-2xl 2xl:rounded-3xl p-10 2xl:p-16 text-center shadow-xl shadow-gray-200/50 dark:shadow-black/20">
                  <div className="flex items-center justify-center gap-1 mb-4 2xl:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 2xl:w-8 2xl:h-8 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-12 h-12 2xl:w-20 2xl:h-20 text-primary/20 mx-auto mb-6 2xl:mb-10" />
                  <p className="text-xl 2xl:text-3xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 2xl:mb-12 italic font-light">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-4 2xl:gap-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 2xl:w-24 2xl:h-24 rounded-full object-cover ring-4 2xl:ring-8 ring-white dark:ring-gray-700 shadow-lg"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white text-lg 2xl:text-2xl">{testimonial.name}</p>
                      <p className="text-sm 2xl:text-lg text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-sm 2xl:text-lg text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-2 2xl:left-6 top-1/2 -translate-y-1/2 p-3 2xl:p-5 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 2xl:w-8 2xl:h-8" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 2xl:right-6 top-1/2 -translate-y-1/2 p-3 2xl:p-5 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 2xl:w-8 2xl:h-8" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 2xl:gap-4 mt-8 2xl:mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 2xl:w-5 2xl:h-5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-primary scale-125 shadow-lg shadow-primary/30'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 2xl:gap-10">
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl 2xl:rounded-3xl p-8 2xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl 2xl:text-6xl font-bold text-primary mb-2 2xl:mb-4">10,000+</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium 2xl:text-xl">Equipos activos</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl 2xl:rounded-3xl p-8 2xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl 2xl:text-6xl font-bold text-primary mb-2 2xl:mb-4">99.9%</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium 2xl:text-xl">Uptime garantizado</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl 2xl:rounded-3xl p-8 2xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl 2xl:text-6xl font-bold text-primary mb-2 2xl:mb-4">50M+</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium 2xl:text-xl">Proyectos creados</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl 2xl:rounded-3xl p-8 2xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl 2xl:text-6xl font-bold text-primary mb-2 2xl:mb-4">4.9/5</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium 2xl:text-xl">Calificación media</div>
        </div>
      </div>
    </div>
  );
}

export default Testimonios;