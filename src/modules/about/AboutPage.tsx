export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Acerca de Alexia Anestesia
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
          Alexia Anestesia es una herramienta de consulta rapida pensada para profesionales de
          anestesiologia. Permite acceder en segundos a informacion farmacologica esencial
          durante la practica clinica diaria.
        </p>
      </header>

      {/* Qué hace */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Que ofrece esta herramienta
        </h2>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>
              <strong>Vademecum anestesico:</strong> Fichas de referencia de 23 farmacos de uso habitual
              en anestesia, con datos de farmacocinetica, diluciones estandar, contraindicaciones
              y preparacion practica para el quirofano.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>
              <strong>Calculadora de dosis por peso:</strong> Calculo automatico de rangos de dosis
              segun el peso del paciente, con alertas de dosis maxima absoluta y advertencias
              clinicas relevantes.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>
              <strong>Conversor de unidades clinicas:</strong> Conversiones rapidas de masa,
              infusiones IV (mcg/kg/min a mL/h), presion, temperatura y volumen, mostrando
              la formula utilizada para verificacion.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>
              <strong>Checklist pre-anestesia:</strong> Lista de verificacion personalizable
              con los items estandar de evaluacion preoperatoria, equipo, farmacos y plan
              anestesico.
            </span>
          </li>
        </ul>
      </section>

      {/* Origen de los datos */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Origen de los datos
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Todos los datos farmacologicos presentados en esta aplicacion provienen de textos de
          referencia reconocidos internacionalmente en anestesiologia y farmacologia clinica.
          No se utiliza inteligencia artificial generativa para producir contenido clinico.
          La informacion se presenta tal como figura en las fuentes originales.
        </p>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
          <Citation
            title="Miller's Anesthesia"
            detail="Miller RD, Cohen NH, Eriksson LI, Fleisher LA, Wiener-Kronish JP, Young WL, eds."
            edition="9th edition. Philadelphia: Elsevier; 2020."
            usage="Fuente principal para rangos de dosis de agentes intravenosos, opioides,
              bloqueantes neuromusculares, anestesicos locales, farmacocinetica y
              parametros de seguridad."
          />
          <Citation
            title="Stoelting's Pharmacology & Physiology in Anesthetic Practice"
            detail="Flood P, Rathmell JP, Urman RD, eds."
            edition="6th edition. Philadelphia: Wolters Kluwer; 2022."
            usage="Datos complementarios de farmacocinetica, mecanismos de accion,
              interacciones farmacologicas y consideraciones clinicas especificas."
          />
          <Citation
            title="Goodman & Gilman's The Pharmacological Basis of Therapeutics"
            detail="Brunton LL, Hilal-Dandan R, Knollmann BC, eds."
            edition="14th edition. New York: McGraw-Hill; 2023."
            usage="Referencia para farmacologia general, benzodiacepinas, opioides y
              agentes del sistema nervioso autonomo."
          />
        </div>
      </section>

      {/* Limitaciones */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Limitaciones importantes
        </h2>
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
          <ul className="space-y-2 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <li>
              Esta aplicacion es una herramienta de referencia. No reemplaza el criterio
              clinico profesional ni la evaluacion individual de cada paciente.
            </li>
            <li>
              Los rangos de dosis son orientativos y deben ajustarse segun la condicion
              clinica, comorbilidades, edad y peso del paciente.
            </li>
            <li>
              Las diluciones y preparaciones corresponden a practicas estandar habituales.
              Verificar siempre contra los protocolos institucionales vigentes.
            </li>
            <li>
              La informacion puede no estar actualizada frente a cambios recientes en guias
              clinicas o fichas tecnicas de productos. Consultar siempre la fuente primaria
              ante cualquier duda.
            </li>
          </ul>
        </div>
      </section>

      {/* Técnico */}
      <section className="pb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Informacion tecnica
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Alexia Anestesia funciona completamente en el navegador. No almacena datos de
          pacientes ni envia informacion a servidores externos. Los datos de configuracion
          (checklist personalizado, ultimo peso utilizado, preferencias de tema) se guardan
          localmente en el dispositivo. La aplicacion puede instalarse como app en el
          telefono para acceso rapido sin conexion a internet.
        </p>
      </section>
    </div>
  )
}

function Citation({
  title,
  detail,
  edition,
  usage,
}: {
  title: string
  detail: string
  edition: string
  usage: string
}) {
  return (
    <div className="px-5 py-4">
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{detail}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{edition}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
        {usage}
      </p>
    </div>
  )
}
