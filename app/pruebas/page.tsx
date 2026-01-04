import { mockVehicles } from "@/lib/data/vehicles";
import { mockAgency } from "@/lib/data/agency";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleCardSkeleton } from "@/components/VehicleCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// ==============================================
// PÁGINA DE PRUEBAS - DÍA 2
// ==============================================

export default function PruebasPage() {
  // Filtramos algunos vehículos para mostrar diferentes estados
  const vehiculosDestacados = mockVehicles.filter((v) => v.is_featured);
  const vehiculosDisponibles = mockVehicles
    .filter((v) => v.status === "available")
    .slice(0, 6);
  const vehiculosVendidos = mockVehicles.filter((v) => v.status === "sold");
  const vehiculosReservados = mockVehicles.filter(
    (v) => v.status === "reserved"
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              DÍA 2 - Componentes UI
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {mockAgency.name}
            </h1>
            <p className="text-gray-600">
              Página de Pruebas - Componentes y Datos Mock
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* SECCIÓN 1: ESTADÍSTICAS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            📊 Estadísticas de Datos Mock
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-3xl font-bold text-primary">
                {mockVehicles.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Vehículos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-3xl font-bold text-green-600">
                {vehiculosDisponibles.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Disponibles</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-3xl font-bold text-yellow-600">
                {vehiculosDestacados.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Destacados</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-3xl font-bold text-red-600">
                {vehiculosVendidos.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Vendidos</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* SECCIÓN 2: VEHÍCULOS DESTACADOS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">⭐ Vehículos Destacados</h2>
            <Badge variant="secondary">
              {vehiculosDestacados.length} unidades
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculosDestacados.map((vehiculo, index) => (
              <VehicleCard
                key={vehiculo.id}
                vehiculo={vehiculo}
                priority={index < 3} // Optimiza carga de las primeras 3 imágenes
              />
            ))}
          </div>
        </section>

        <Separator />

        {/* SECCIÓN 3: VEHÍCULOS DISPONIBLES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">🚗 Vehículos Disponibles</h2>
            <Badge variant="secondary">
              {vehiculosDisponibles.length} unidades mostradas
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculosDisponibles.map((vehiculo) => (
              <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
            ))}
          </div>
        </section>

        <Separator />

        {/* SECCIÓN 4: VEHÍCULOS VENDIDOS */}
        {vehiculosVendidos.length > 0 && (
          <>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">✅ Vehículos Vendidos</h2>
                <Badge variant="secondary">
                  {vehiculosVendidos.length} unidades
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiculosVendidos.map((vehiculo) => (
                  <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
                ))}
              </div>
            </section>
            <Separator />
          </>
        )}

        {/* SECCIÓN 5: VEHÍCULOS RESERVADOS */}
        {vehiculosReservados.length > 0 && (
          <>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">⏳ Vehículos Reservados</h2>
                <Badge variant="secondary">
                  {vehiculosReservados.length} unidades
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiculosReservados.map((vehiculo) => (
                  <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
                ))}
              </div>
            </section>
            <Separator />
          </>
        )}

        {/* SECCIÓN 6: SKELETON LOADERS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              💀 Skeleton Loaders (Estados de Carga)
            </h2>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VehicleCardSkeleton />
            <VehicleCardSkeleton />
            <VehicleCardSkeleton />
          </div>
          <p className="mt-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
            💡 <strong>Nota:</strong> Los skeletons se muestran mientras los
            datos están cargando. Los usaremos en el DÍA 7 para mejorar la UX.
          </p>
        </section>

        {/* SECCIÓN 7: INFORMACIÓN DE AGENCIA */}
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-4">🏢 Datos de la Agencia</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Nombre:</p>
              <p className="font-semibold">{mockAgency.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Ciudad:</p>
              <p className="font-semibold">{mockAgency.city}</p>
            </div>
            <div>
              <p className="text-gray-600">Teléfono:</p>
              <p className="font-semibold">{mockAgency.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-semibold">{mockAgency.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Dirección:</p>
              <p className="font-semibold">{mockAgency.address}</p>
            </div>
            <div>
              <p className="text-gray-600">WhatsApp:</p>
              <p className="font-semibold">{mockAgency.whatsapp}</p>
            </div>
          </div>
        </section>

        {/* Footer de la página de pruebas */}
        <div className="text-center py-8 text-gray-600">
          <p className="text-sm">
            ✅ <strong>DÍA 2 COMPLETO</strong> - Componentes UI funcionando
            correctamente
          </p>
          <p className="text-xs mt-2">
            Próximo paso: DÍA 3 - Home del Catálogo Público con Navbar y Footer
          </p>
        </div>
      </div>
    </main>
  );
}
