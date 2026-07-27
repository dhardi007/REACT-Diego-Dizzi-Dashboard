// Testimonios.jsx - Testimonials Carousel
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, User, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'CEO en TechStart',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Esta plataforma transformó completamente cómo gestionamos nuestros proyectos. La interfaz es intuitiva y el equipo de soporte es excepcional.',
    rating: 5,
    company: 'TechStart',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'La mejor herramienta de gestión de proyectos que he usado en 10 años de carrera. Simple, potente y hermosa.',
    rating: 5,
    company: 'DevCorp',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'Finalmente una herramienta que entiende cómo trabajan los equipos reales. La vista de progreso y los favoritos son game-changers.',
    rating: 5,
    company: 'InnovateLab',
  },
  {
    id: 4,
    name: 'Diego Torres',
    role: 'CTO en ScaleUp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    text: 'Implementamos esto en todo el departamento de ingeniería. La curva de aprendizaje es casi cero y la adopción fue inmediata.',
    rating: 5,
    company: 'ScaleUp',
  },
  {
    id: 5,
    name: 'Laura Fernández',
    role: 'Diseñadora UX/UI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
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
    <div className="animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Lo que dicen nuestros usuarios
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Historias de éxito de <span className="text-primary">equipos reales</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Miles de equipos confían en nuestra plataforma para organizar su trabajo y lograr más.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl mx-auto mb-16">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-2xl p-10 text-center shadow-xl shadow-gray-200/50 dark:shadow-black/20">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
                  <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 italic font-light">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium">Equipos activos</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium">Uptime garantizado</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl font-bold text-primary mb-2">50M+</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium">Proyectos creados</div>
        </div>
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
          <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
          <div className="text-gray-500 dark:text-gray-400 font-medium">Calificación media</div>
        </div>
      </div>
    </div>
  );
}

export default Testimonios;