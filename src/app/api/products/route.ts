import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import prisma from "../../../../lib/prisma";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload the image as a buffer
const uploadImage = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: uuidv4(),
        folder: "products",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result); // resolve with the result object, which contains secure_url
      }
    );
    // Pipe the buffer into the upload stream
    uploadStream.end(buffer);
  });
};

export const POST = async (req: NextRequest) => {
  try {
    // Get the form data
    const formData = await req.formData();
    
    // Extract fields and file from formData
    const shopCenterName = formData.get('shopCenterName') as string;
    const productName = formData.get('productName') as string;
    const productWeight = formData.get('productWeight') as string;
    const productPrice = formData.get('productPrice') as string;
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert the file to a buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the image to Cloudinary using the buffer and get the result
    const imageUploadResult: any = await uploadImage(buffer);

    // Save the product data to the database
    const product = await prisma.products.create({
      data: {
        shopCenterName,
        productName,
        productWeight: parseFloat(productWeight),
        productPrice: parseFloat(productPrice),
        imageUrl: imageUploadResult.secure_url, // Using the secure_url from the Cloudinary response
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to upload image and save product data" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve products" }, { status: 500 });
  }
};


