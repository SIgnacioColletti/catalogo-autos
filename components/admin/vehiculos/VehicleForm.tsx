"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, type VehicleFormData } from "@/lib/validations/vehicle";
import { createVehicle, updateVehicle } from "@/app/admin/vehiculos/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeaturesEditor } from "./FeaturesEditor";
import { ImagesEditor } from "./ImagesEditor";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Vehicle } from "@/lib/types";

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  mode: "create" | "edit";
}

export const VehicleForm = ({ vehicle, mode }: VehicleFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema) as any,
    defaultValues: vehicle ?? {
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
      features: [],
      images: [],
      is_featured: false,
      status: "available",
    },
  });

  const onSubmit = async (data: VehicleFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : String(value)
        );
      });

      const result =
        mode === "create"
          ? await createVehicle(formData)
          : await updateVehicle(vehicle!.id, formData);

      if (result?.error) {
        toast.error("Error", { description: result.error });
        return;
      }

      toast.success("Exito", {
        description:
          mode === "create"
            ? "Vehiculo creado correctamente"
            : "Vehiculo actualizado correctamente",
      });

      router.push("/admin/vehiculos");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información Básica */}
        <Card>
          <CardHeader>
            <CardTitle>Informacion Basica</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marca *</Label>
              <Input
                id="brand"
                {...register("brand")}
                placeholder="Toyota, Ford"
              />
              {errors.brand && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.brand.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                {...register("model")}
                placeholder="Corolla, Ranger"
              />
              {errors.model && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.model.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="year">Año *</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
              />
              {errors.year && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.year.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="color">Color *</Label>
              <Input
                id="color"
                {...register("color")}
                placeholder="Blanco, Negro"
              />
              {errors.color && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.color.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detalles Técnicos */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles Tecnicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio (ARS) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="5000000"
                />
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="kilometers">Kilometros *</Label>
                <Input
                  id="kilometers"
                  type="number"
                  {...register("kilometers", { valueAsNumber: true })}
                  placeholder="50000"
                />
                {errors.kilometers && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.kilometers.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Combustible *</Label>
                <Controller
                  name="fuel_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nafta">Nafta</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="gnc">GNC</SelectItem>
                        <SelectItem value="electrico">Electrico</SelectItem>
                        <SelectItem value="hibrido">Hibrido</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Transmision *</Label>
                <Controller
                  name="transmission"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatica">Automatica</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Carroceria *</Label>
                <Controller
                  name="body_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Puertas *</Label>
                <Controller
                  name="doors"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(v) => field.onChange(parseInt(v))}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 puertas</SelectItem>
                        <SelectItem value="3">3 puertas</SelectItem>
                        <SelectItem value="4">4 puertas</SelectItem>
                        <SelectItem value="5">5 puertas</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripcion *</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={4}
                placeholder="Describe el vehiculo..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {watch("description")?.length || 0} caracteres
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Características */}
        <Card>
          <CardHeader>
            <CardTitle>Caracteristicas</CardTitle>
          </CardHeader>
          <CardContent>
            <FeaturesEditor
              features={watch("features")}
              onChange={(f) => setValue("features", f)}
            />
            {errors.features && (
              <p className="text-sm text-red-600 mt-2">
                {errors.features.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Imagenes del Vehiculo</CardTitle>
          </CardHeader>
          <CardContent>
            <ImagesEditor
              images={watch("images")}
              onChange={(i) => setValue("images", i)}
            />
            {errors.images && (
              <p className="text-sm text-red-600 mt-2">
                {errors.images.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Estado y Opciones */}
        <Card>
          <CardHeader>
            <CardTitle>Estado y Opciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Estado *</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="reserved">Reservado</SelectItem>
                      <SelectItem value="sold">Vendido</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg">
              <div>
                <Label className="text-base font-medium">
                  Vehiculo Destacado
                </Label>
                <p className="text-sm text-gray-500">
                  Aparecera en la pagina principal
                </p>
              </div>
              <Controller
                name="is_featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botones */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading
              ? "Guardando..."
              : mode === "create"
              ? "Crear Vehiculo"
              : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
};
