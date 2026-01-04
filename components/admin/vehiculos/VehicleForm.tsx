"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vehicleSchema,
  type VehicleFormValues,
} from "@/lib/validations/vehicle";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VehiclePreview } from "./VehiclePreview";
import {
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import { FeaturesSection } from "./FeaturesSection";
import { ImagesSection } from "./ImagesSection";
import { useVehiclesStore } from "@/lib/store/useVehiclesStore";

// ==============================================
// FORMULARIO DE VEHÍCULO (COMPLETO)
// ==============================================

interface VehicleFormProps {
  initialData?: Vehicle;
  isEdit?: boolean;
}

export const VehicleForm = ({
  initialData,
  isEdit = false,
}: VehicleFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addVehicle, updateVehicle } = useVehiclesStore();

  // Valores por defecto
  const defaultValues: Partial<VehicleFormValues> = initialData
    ? {
        brand: initialData.brand,
        model: initialData.model,
        year: initialData.year,
        price: initialData.price,
        kilometers: initialData.kilometers,
        fuel_type: initialData.fuel_type,
        transmission: initialData.transmission,
        color: initialData.color,
        body_type: initialData.body_type,
        doors: initialData.doors,
        description: initialData.description,
        status: initialData.status,
        is_featured: initialData.is_featured,
        features: initialData.features,
        images: initialData.images,
      }
    : {
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        price: 0,
        kilometers: 0,
        fuel_type: "nafta",
        transmission: "manual",
        color: "",
        body_type: "sedan",
        doors: 4,
        description: "",
        status: "available",
        is_featured: false,
        features: [],
        images: [],
      };

  const form = useForm({
    resolver: zodResolver(vehicleSchema) as any,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  const watchedValues = form.watch();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      if (isEdit && initialData) {
        // Actualizar vehículo existente
        updateVehicle(initialData.id, data);

        toast.success("Vehículo actualizado", {
          description: `${data.brand} ${data.model} fue actualizado correctamente`,
        });
      } else {
        // Crear nuevo vehículo
        addVehicle(data);

        toast.success("Vehículo creado", {
          description: `${data.brand} ${data.model} fue agregado al inventario`,
        });
      }

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirigir a listado
      router.push("/admin/vehiculos");
    } catch (error) {
      console.error("Error al guardar:", error);

      toast.error("Error al guardar", {
        description:
          "Ocurrió un error al guardar el vehículo. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* FORMULARIO - 2 columnas */}
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* INFORMACIÓN BÁSICA */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>
                  Datos principales del vehículo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Marca y Modelo */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca *</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Corolla" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Año y Precio */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Año *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2023"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="15000000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Precio en pesos argentinos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Kilómetros y Color */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="kilometers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kilómetros *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color *</FormLabel>
                        <FormControl>
                          <Input placeholder="Blanco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* DETALLES TÉCNICOS */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles Técnicos</CardTitle>
                <CardDescription>Especificaciones del vehículo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Combustible y Transmisión */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fuel_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Combustible *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el combustible" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(fuelTypeLabels).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmisión *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona la transmisión" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(transmissionLabels).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Carrocería y Puertas */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="body_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Carrocería *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(bodyTypeLabels).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Puertas *</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Cantidad de puertas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2">2 puertas</SelectItem>
                            <SelectItem value="3">3 puertas</SelectItem>
                            <SelectItem value="4">4 puertas</SelectItem>
                            <SelectItem value="5">5 puertas</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* DESCRIPCIÓN */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
                <CardDescription>
                  Describe el vehículo en detalle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe el estado, equipamiento y características del vehículo..."
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0} / 1000 caracteres (mínimo 50)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* CARACTERÍSTICAS */}
            <FeaturesSection form={form} />

            {/* IMÁGENES */}
            <ImagesSection form={form} />

            {/* ESTADO Y CONFIGURACIÓN */}
            <Card>
              <CardHeader>
                <CardTitle>Estado y Configuración</CardTitle>
                <CardDescription>
                  Configura la visibilidad del vehículo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Estado */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="available">Disponible</SelectItem>
                          <SelectItem value="reserved">Reservado</SelectItem>
                          <SelectItem value="sold">Vendido</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Destacado */}
                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Vehículo Destacado
                        </FormLabel>
                        <FormDescription>
                          Se mostrará en la página principal del catálogo
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancelar
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEdit ? "Actualizar" : "Crear"} Vehículo
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* VISTA PREVIA - 1 columna */}
      <div className="lg:col-span-1">
        <VehiclePreview data={watchedValues} />
      </div>
    </div>
  );
};
