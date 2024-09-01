import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserUseCase } from "@/usecase/user";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const usecase = new UserUseCase();
    const existingUser = await usecase.getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
