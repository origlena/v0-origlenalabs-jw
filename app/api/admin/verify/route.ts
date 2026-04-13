import { NextResponse } from "next/server"

const ADMIN_PASSWORD = "sabana299@"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Generate a simple session token
      const token = Buffer.from(`admin-${Date.now()}-${Math.random()}`).toString("base64")

      return NextResponse.json({
        success: true,
        token,
        message: "Authentication successful",
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid password",
      },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
      },
      { status: 500 },
    )
  }
}
