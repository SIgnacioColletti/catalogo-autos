import { NextRequest, NextResponse } from "next/server";
import { incrementVehicleViews } from "@/lib/supabase/queries";

// ==============================================
// API: TRACKEAR VISTA DE VEHÍCULO
// ==============================================

export async function POST(request: NextRequest) {
  try {
    const { vehicleId } = await request.json();

    if (!vehicleId) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    // Incrementar vistas en Supabase
    await incrementVehicleViews(vehicleId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}
