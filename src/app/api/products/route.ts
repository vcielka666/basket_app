import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const { shopCenterName, productName, productWeight, productPrice } = await req.json();

  const product = await prisma.products.create({
    data: {
      shopCenterName,
      productName,
      productWeight,
      productPrice,
    },
  });

  return NextResponse.json(product);
}

export async function GET(){
  const products = await prisma.products.findMany();
  return NextResponse.json(products);
}