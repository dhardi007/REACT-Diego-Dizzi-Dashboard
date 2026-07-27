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
    <div className="animate-fade-in max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 py-8 md:py-10 lg:py-14 xl:py-16">
      {/* Header */}
      <div className="mb-8 md:mb-12 lg:mb-16 xl:mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs md:text-sm lg:text-base font-medium mb-3 md:mb-4 lg:mb-5 xl:mb-6">
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          Lo que dicen nuestros usuarios
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 lg:mb-5 xl:mb-6">
          Historias de éxito de <span className="text-primary">equipos reales</span>
        </h1>
        <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
          Miles de equipos confían en nuestra plataforma para organizar su trabajo y lograr más.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto mb-10 md:mb-16 lg:mb-20 xl:mb-24">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2 md:px-4 lg:px-6 xl:px-8">
                <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-10 lg:p-14 xl:p-16 text-center shadow-xl shadow-gray-200/50 dark:shadow-black/20">
                  <div className="flex items-center justify-center gap-1 mb-3 md:mb-4 lg:mb-5 xl:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-primary/20 mx-auto mb-4 md:mb-6 lg:mb-8 xl:mb-10" />
                  <p className="text-base md:text-xl lg:text-2xl xl:text-3xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 md:mb-8 lg:mb-10 xl:mb-12 italic font-light">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full object-cover ring-2 md:ring-4 lg:ring-6 xl:ring-8 ring-white dark:ring-gray-700 shadow-lg"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-lg lg:text-xl xl:text-2xl">{testimonial.name}</p>
                      <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs md:text-sm lg:text-base xl:text-lg text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-1 md:left-2 lg:left-4 xl:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 lg:p-4 xl:p-5 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
          </button>
          <button
            onClick={next}
            className="absolute right-1 md:right-2 lg:right-4 xl:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 lg:p-4 xl:p-5 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:w-6 xl:w-8 xl:h-8" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-8 lg:mt-10 xl:mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 bg-primary ring-[2px] md:ring-[3px] ring-gray-900/25 dark:ring-white shadow-md shadow-primary/40'
                  : 'w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 bg-gray-400 dark:bg-gray-500 hover:bg-primary/70'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-8 lg:p-10 xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-1 md:mb-2 lg:mb-3 xl:mb-4">10,000+</div>
          <div className="text-xs md:text-base lg:text-lg xl:text-xl text-gray-500 dark:text-gray-400 font-medium">Equipos activos</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-8 lg:p-10 xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-1 md:mb-2 lg:mb-3 xl:mb-4">99.9%</div>
          <div className="text-xs md:text-base lg:text-lg xl:text-xl text-gray-500 dark:text-gray-400 font-medium">Uptime garantizado</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-8 lg:p-10 xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-1 md:mb-2 lg:mb-3 xl:mb-4">50M+</div>
          <div className="text-xs md:text-base lg:text-lg xl:text-xl text-gray-500 dark:text-gray-400 font-medium">Proyectos creados</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-8 lg:p-10 xl:p-12 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-1 md:mb-2 lg:mb-3 xl:mb-4">4.9/5</div>
          <div className="text-xs md:text-base lg:text-lg xl:text-xl text-gray-500 dark:text-gray-400 font-medium">Calificación media</div>
        </div>
      </div>
    </div>
  );
}

export default Testimonios;