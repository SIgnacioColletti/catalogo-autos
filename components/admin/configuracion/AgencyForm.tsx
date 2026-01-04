"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAgencyStore } from "@/lib/store/useAgencyStore";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AgencyPreview } from "./AgencyPreview";
import { Save, RotateCcw, Upload } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import type { Agency } from "@/lib/types";

// ==============================================
// FORMULARIO DE CONFIGURACIÓN DE AGENCIA
// ==============================================

export const AgencyForm = () => {
  const {
    agency,
    updateAgency,
    resetAgency,
    loadAgencyFromStorage,
    saveAgencyToStorage,
  } = useAgencyStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const form = useForm({
    defaultValues: agency,
    mode: "onChange",
  });

  const watchedValues = form.watch();

  // Cargar desde localStorage al montar
  useEffect(() => {
    loadAgencyFromStorage();
  }, [loadAgencyFromStorage]);

  // Actualizar form cuando cambie el store
  useEffect(() => {
    form.reset(agency);
  }, [agency, form]);

  const onSubmit = async (data: any) => {
    setIsSaving(true);

    try {
      updateAgency(data);
      saveAgencyToStorage();

      toast.success("Configuración guardada", {
        description: "Los cambios se aplicarán al recargar la página",
      });

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Recargar página para aplicar cambios en toda la app
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar:", error);

      toast.error("Error al guardar", {
        description:
          "Ocurrió un error al guardar la configuración. Intenta nuevamente.",
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres resetear a los valores por defecto?"
      )
    ) {
      resetAgency();
      form.reset(agency);

      toast.info("Configuración reseteada", {
        description: "Se restauraron los valores por defecto",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* FORMULARIO - 2 columnas */}
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* INFORMACIÓN GENERAL */}
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>Datos básicos de tu agencia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nombre */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Agencia *</FormLabel>
                      <FormControl>
                        <Input placeholder="AutoMax Rosario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ciudad */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad *</FormLabel>
                      <FormControl>
                        <Input placeholder="Rosario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Logo URL */}
                <FormField
                  control={form.control}
                  name="logo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL del Logo</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://ejemplo.com/logo.png"
                            {...field}
                          />
                          <Button type="button" variant="outline" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        URL de tu logo (simulado, en producción sería upload
                        real)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* COLORES */}
            <Card>
              <CardHeader>
                <CardTitle>Colores de Marca</CardTitle>
                <CardDescription>
                  Personaliza los colores de tu agencia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Color Primario */}
                <FormField
                  control={form.control}
                  name="primary_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Primario</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              placeholder="#3b82f6"
                              {...field}
                              className="flex-1"
                            />
                            <button
                              type="button"
                              className="w-12 h-10 rounded border-2 border-gray-200"
                              style={{ backgroundColor: field.value }}
                              onClick={() =>
                                setShowPrimaryPicker(!showPrimaryPicker)
                              }
                            />
                          </div>
                          {showPrimaryPicker && (
                            <div className="border rounded-lg p-3 bg-white">
                              <HexColorPicker
                                color={field.value}
                                onChange={field.onChange}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Se usará en botones, enlaces y elementos principales
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Color Secundario */}
                <FormField
                  control={form.control}
                  name="secondary_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Secundario</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              placeholder="#8b5cf6"
                              {...field}
                              className="flex-1"
                            />
                            <button
                              type="button"
                              className="w-12 h-10 rounded border-2 border-gray-200"
                              style={{ backgroundColor: field.value }}
                              onClick={() =>
                                setShowSecondaryPicker(!showSecondaryPicker)
                              }
                            />
                          </div>
                          {showSecondaryPicker && (
                            <div className="border rounded-lg p-3 bg-white">
                              <HexColorPicker
                                color={field.value}
                                onChange={field.onChange}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Se usará en acentos y elementos secundarios
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* CONTACTO */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>
                  Datos para que los clientes te contacten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Teléfono */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono *</FormLabel>
                        <FormControl>
                          <Input placeholder="0341 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* WhatsApp */}
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp *</FormLabel>
                        <FormControl>
                          <Input placeholder="5493411234567" {...field} />
                        </FormControl>
                        <FormDescription>
                          Con código de país (549)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contacto@automax.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dirección */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección *</FormLabel>
                      <FormControl>
                        <Input placeholder="Av. Pellegrini 1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* REDES SOCIALES */}
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
                <CardDescription>
                  Enlaces a tus perfiles (opcional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Instagram */}
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/automax"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Facebook */}
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/automax"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* BOTONES */}
            <div className="flex items-center justify-between">
              <Button type="button" variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Resetear
              </Button>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* VISTA PREVIA - 1 columna */}
      <div className="lg:col-span-1">
        <AgencyPreview agency={watchedValues} />
      </div>
    </div>
  );
};
