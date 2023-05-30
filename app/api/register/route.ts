import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  const hashPasswrd = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashPasswrd,
    },
  });

  return NextResponse.json(user);
}
