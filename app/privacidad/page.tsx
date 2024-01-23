function PoliticasPrivacidad() {
  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Políticas de Datos Personales y Privacidad de Qury
      </h2>

      <h4 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">
        Política de Tratamiento de Datos Personales
      </h4>
      <p className="text-gray-600 leading-relaxed mb-4">
        En Qury, valoramos y respetamos la privacidad de nuestros usuarios.
        Acorde con la Ley N°29733, “Ley de Protección de Datos Personales”,
        informamos las prácticas y políticas de manejo de la información
        recopilada a través de nuestras plataformas y servicios. Esta política
        tiene el propósito de informar a los usuarios sobre el tratamiento y
        protección de sus datos personales.
      </p>

      <h4 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">
        Información Recopilada y Propósito
      </h4>
      <p className="text-gray-600 leading-relaxed mb-4">
        Para ofrecer nuestros servicios, recolectamos diversos tipos de datos,
        incluidos pero no limitados a:
      </p>
      <ul className="list-disc pl-6 text-gray-600 leading-relaxed mb-4">
        <li>
          <strong>Nombre y Apellidos:</strong> Identificación y personalización
          del servicio.
        </li>
        <li>
          <strong>DNI:</strong> Para garantizar la unicidad de los usuarios y
          para procesos de verificación y seguridad.
        </li>
        <li>
          <strong>Razón Social y RUC:</strong> En caso de usuarios corporativos,
          para procesos de facturación y verificación.
        </li>
        <li>
          <strong>Correo Electrónico:</strong> Comunicación y envío de
          notificaciones relevantes.
        </li>
        <li>
          <strong>Número Telefónico:</strong> Contacto directo y verificación de
          identidad.
        </li>
        <li>
          <strong>Fecha de Nacimiento:</strong> Para garantizar que el usuario
          es mayor de edad y para ofrecer posibles promociones relacionadas con
          cumpleaños.
        </li>
        <li>
          <strong>Información Financiera (número de cuenta, tarjeta):</strong>{" "}
          Para facilitar transacciones, cobros y pagos dentro de la plataforma
          de Qury.
        </li>
        <li>
          <strong>Información de Productos:</strong> Para la visualización y
          promoción de productos en el marketplace de Qury.
        </li>
        <li>
          <strong>Historial de transacciones y chat:</strong> Mejorar la
          experiencia del usuario y brindar soporte.
        </li>
      </ul>

      <h4 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">
        Seguridad y Protección de la Información
      </h4>
      <p className="text-gray-600 leading-relaxed mb-4">
        La seguridad de tu información es una prioridad para Qury. Usamos
        tecnologías avanzadas y las mejores prácticas para proteger tus datos.
        Toda la información se almacena de manera segura en servidores de Amazon
        Web Services (AWS), garantizando los más altos estándares de seguridad y
        protección de datos.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Adicionalmente, aplicamos procedimientos de tokenización en tarjetas de
        pago para asegurar que la información sensible no esté expuesta en
        ningún momento. Nos asociamos con Izipay, líder en servicios de pago,
        para garantizar un tratamiento y procesamiento de información seguro y
        confiable.
      </p>

      <h4 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">
        Derechos del Usuario y Canales de Comunicación
      </h4>
      <p className="text-gray-600 leading-relaxed mb-4">
        Acorde con la Ley N°29733, como usuario de Qury, tienes el derecho de
        acceder, rectificar o cancelar tus datos personales en cualquier
        momento. Puedes ejercer estos derechos a través de nuestros canales de
        comunicación disponibles. Estamos comprometidos en garantizar tu derecho
        a la protección de tus datos personales.
      </p>

      <p className="text-gray-600 leading-relaxed mt-6">
        Valoramos la confianza que depositas en Qury y reiteramos nuestro
        compromiso de proteger tu privacidad y tus datos personales. Para
        cualquier consulta o inquietud, no dudes en ponerte en contacto con
        nosotros.
      </p>
    </div>
  );
}

export default PoliticasPrivacidad;
