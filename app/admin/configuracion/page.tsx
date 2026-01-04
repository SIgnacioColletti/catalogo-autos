import { AgencyForm } from "@/components/admin/configuracion/AgencyForm";
import { FadeIn } from "@/components/animations/FadeIn";

// ==============================================
// PÁGINA DE CONFIGURACIÓN DE AGENCIA
// ==============================================

export default function ConfiguracionPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <FadeIn>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración de la Agencia
          </h2>
          <p className="text-gray-600">
            Personaliza la información y apariencia de tu agencia
          </p>
        </div>
      </FadeIn>

      {/* Formulario */}
      <AgencyForm />
    </div>
  );
}
