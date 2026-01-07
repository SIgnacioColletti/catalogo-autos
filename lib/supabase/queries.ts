import { createClient } from "./server";
import type { Vehicle } from "@/lib/types";
import { logger } from "@/lib/logger";

// ==============================================
// QUERIES DE SUPABASE
// ==============================================

// Interfaz para filtros de vehículos
export interface VehicleFilters {
  search?: string;
  brands?: string[];
  yearFrom?: number | null;
  yearTo?: number | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  kilometersFrom?: number | null;
  kilometersTo?: number | null;
  fuelTypes?: string[];
  transmissions?: string[];
  bodyTypes?: string[];
  status?: string[];
  isFeatured?: boolean;
}

// Interfaz para ordenamiento
export type VehicleSortBy =
  | "recent"
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "km-asc"
  | "km-desc";

// ==============================================
// OBTENER VEHÍCULOS CON FILTROS Y PAGINACIÓN
// ==============================================
export async function getVehicles({
  filters = {},
  sortBy = "recent",
  page = 1,
  limit = 12,
}: {
  filters?: VehicleFilters;
  sortBy?: VehicleSortBy;
  page?: number;
  limit?: number;
}) {
  try {
    logger.info("Fetching vehicles", { filters, sortBy, page, limit });

    const supabase = await createClient();
    let query = supabase.from("vehicles").select("*", { count: "exact" });

    // FILTROS
    if (filters.search) {
      const searchTerm = `%${filters.search}%`;
      const isNumber = !isNaN(Number(filters.search));

      if (isNumber) {
        query = query.or(
          `brand.ilike.${searchTerm},model.ilike.${searchTerm},year.eq.${filters.search}`
        );
      } else {
        query = query.or(`brand.ilike.${searchTerm},model.ilike.${searchTerm}`);
      }
    }

    if (filters.brands && filters.brands.length > 0) {
      query = query.in("brand", filters.brands);
    }

    if (filters.yearFrom !== null && filters.yearFrom !== undefined) {
      query = query.gte("year", filters.yearFrom);
    }
    if (filters.yearTo !== null && filters.yearTo !== undefined) {
      query = query.lte("year", filters.yearTo);
    }

    if (filters.priceFrom !== null && filters.priceFrom !== undefined) {
      query = query.gte("price", filters.priceFrom);
    }
    if (filters.priceTo !== null && filters.priceTo !== undefined) {
      query = query.lte("price", filters.priceTo);
    }

    if (
      filters.kilometersFrom !== null &&
      filters.kilometersFrom !== undefined
    ) {
      query = query.gte("kilometers", filters.kilometersFrom);
    }
    if (filters.kilometersTo !== null && filters.kilometersTo !== undefined) {
      query = query.lte("kilometers", filters.kilometersTo);
    }

    if (filters.fuelTypes && filters.fuelTypes.length > 0) {
      query = query.in("fuel_type", filters.fuelTypes);
    }

    if (filters.transmissions && filters.transmissions.length > 0) {
      query = query.in("transmission", filters.transmissions);
    }

    if (filters.bodyTypes && filters.bodyTypes.length > 0) {
      query = query.in("body_type", filters.bodyTypes);
    }

    if (filters.status && filters.status.length > 0) {
      query = query.in("status", filters.status);
    } else {
      query = query.neq("status", "sold");
    }

    if (filters.isFeatured !== undefined) {
      query = query.eq("is_featured", filters.isFeatured);
    }

    // ORDENAMIENTO
    switch (sortBy) {
      case "recent":
        query = query.order("created_at", { ascending: false });
        break;
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "year-asc":
        query = query.order("year", { ascending: true });
        break;
      case "year-desc":
        query = query.order("year", { ascending: false });
        break;
      case "km-asc":
        query = query.order("kilometers", { ascending: true });
        break;
      case "km-desc":
        query = query.order("kilometers", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    // PAGINACIÓN
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      logger.error("Error fetching vehicles", error);
      throw error;
    }

    logger.info("Vehicles fetched successfully", { count: data?.length });

    return {
      vehicles: (data as Vehicle[]) || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  } catch (error) {
    logger.error("Error in getVehicles", error);
    return {
      vehicles: [],
      total: 0,
      page: 1,
      limit,
      totalPages: 0,
    };
  }
}

export async function getFeaturedVehicles(limit: number = 6) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_featured", true)
      .neq("status", "sold")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Error fetching featured vehicles", error);
      throw error;
    }

    return (data as Vehicle[]) || [];
  } catch (error) {
    logger.error("Error in getFeaturedVehicles", error);
    return [];
  }
}

export async function getUniqueBrands() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("brand")
      .neq("status", "sold");

    if (error) {
      logger.error("Error fetching brands", error);
      throw error;
    }

    const brands = [...new Set(data.map((v) => v.brand))].sort();
    return brands;
  } catch (error) {
    logger.error("Error in getUniqueBrands", error);
    return [];
  }
}

export async function getAgency(slug: string = "automax-rosario") {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("agencies")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      logger.error("Error fetching agency", error);
      throw error;
    }

    return data;
  } catch (error) {
    logger.error("Error in getAgency", error);
    return null;
  }
}

export async function getTotalVehiclesCount() {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .neq("status", "sold");

    if (error) {
      logger.error("Error counting vehicles", error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    logger.error("Error in getTotalVehiclesCount", error);
    return 0;
  }
}

export async function getVehicleById(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      logger.error("Error fetching vehicle", error);
      throw error;
    }

    return data as Vehicle;
  } catch (error) {
    logger.error("Error in getVehicleById", error);
    return null;
  }
}

export async function incrementVehicleViews(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("increment_views", {
      vehicle_id: id,
    });

    if (error) {
      const { data: vehicle } = await supabase
        .from("vehicles")
        .select("views")
        .eq("id", id)
        .single();

      if (vehicle) {
        await supabase
          .from("vehicles")
          .update({ views: (vehicle.views || 0) + 1 })
          .eq("id", id);
      }
    }
  } catch (error) {
    logger.error("Error incrementing views", error);
  }
}

export async function getRelatedVehicles(
  brand: string,
  currentId: string,
  limit: number = 3
) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("brand", brand)
      .neq("id", currentId)
      .neq("status", "sold")
      .limit(limit);

    if (error) {
      logger.error("Error fetching related vehicles", error);
      throw error;
    }

    return (data as Vehicle[]) || [];
  } catch (error) {
    logger.error("Error in getRelatedVehicles", error);
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const supabase = await createClient();

    const { count: totalVehicles } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true });

    const { count: soldVehicles } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("status", "sold");

    const { count: featuredVehicles } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true);

    const { data: viewsData } = await supabase.from("vehicles").select("views");

    const totalViews =
      viewsData?.reduce((sum, v) => sum + (v.views || 0), 0) || 0;

    return {
      totalVehicles: totalVehicles || 0,
      soldVehicles: soldVehicles || 0,
      featuredVehicles: featuredVehicles || 0,
      totalViews,
    };
  } catch (error) {
    logger.error("Error getting dashboard stats", error);
    return {
      totalVehicles: 0,
      soldVehicles: 0,
      featuredVehicles: 0,
      totalViews: 0,
    };
  }
}

export async function getVehiclesByBrand() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("brand")
      .neq("status", "sold");

    if (error) {
      logger.error("Error getting vehicles by brand", error);
      throw error;
    }

    const brandCounts: Record<string, number> = {};
    data?.forEach((v) => {
      brandCounts[v.brand] = (brandCounts[v.brand] || 0) + 1;
    });

    return Object.entries(brandCounts)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    logger.error("Error in getVehiclesByBrand", error);
    return [];
  }
}

export async function getRecentVehicles(limit: number = 5) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Error getting recent vehicles", error);
      throw error;
    }

    return (data as Vehicle[]) || [];
  } catch (error) {
    logger.error("Error in getRecentVehicles", error);
    return [];
  }
}

export async function getMostViewedVehicles(limit: number = 5) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("views", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Error getting most viewed vehicles", error);
      throw error;
    }

    return (data as Vehicle[]) || [];
  } catch (error) {
    logger.error("Error in getMostViewedVehicles", error);
    return [];
  }
}
