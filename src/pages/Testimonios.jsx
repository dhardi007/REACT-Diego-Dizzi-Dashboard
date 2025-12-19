import Testimonio from "../componentes/Testimonio";
import shawnImg from "../imagenes/testimonio-shawn.png";
import sarahImg from "../imagenes/testimonio-sarah.png";
import emmaImg from "../imagenes/testimonio-emma.png";

function Testimonios() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Esto es lo que dicen nuestros alumnos sobre freeCodeCamp:
        </h1>
        <Testimonio
          nombre="Shawn Wang"
          pais="Singapur"
          imagen={shawnImg}
          cargo="Ingeniero de Software"
          empresa="Amazon"
          testimonio="Da miedo cambiar de carrera. Solo gané la confianza de que podía programar trabajando a través de los cientos de horas de lecciones gratuitas en freeCodeCamp. Dentro de un año tuve un trabajo de seis cifras como ingeniero de software. freeCodeCamp cambió mi vida."
        />
        <Testimonio
          nombre="Sarah Chima"
          pais="Nigeria"
          imagen={sarahImg}
          cargo="Ingeniera de Software"
          empresa="ChatDesk"
          testimonio="freeCodeCamp fue la puerta de entrada a mi carrera como desarrollador de software. El plan de estudios bien estructurado llevó mis conocimientos de programación de un nivel de principiante total a un nivel muy seguro. Era todo lo que necesitaba para conseguir mi primer trabajo de desarrollador en una empresa increíble."
        />
        <Testimonio
          nombre="Emma Bostian"
          pais="Suecia"
          imagen={emmaImg}
          cargo="Ingeniera de Software"
          empresa="Spotify"
          testimonio="Siempre he tenido problemas para aprender JavaScript. He tomado muchos cursos, pero el curso de freeCodeCamp fue el que se quedó. Estudiar JavaScript, así como estructuras de datos y algoritmos en freeCodeCamp me dio las habilidades y la confianza que necesitaba para conseguir el trabajo de mis sueños como ingeniero de software en Spotify."
        />
      </div>
    </div>
  );
}

export default Testimonios;
