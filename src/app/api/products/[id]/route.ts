import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import cloudinary from "../../../../../lib/cloudinary";

// Handle DELETE request to delete a product and its image
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Find the product in the database
    const product = await prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete the image from Cloudinary if the image URL exists
    if (product.imageUrl) {
      // Extract public_id from the image URL (Cloudinary images have public_id in their URL)
      const publicId = product.imageUrl.split('/').pop()?.split('.')[0]; // Adjust this depending on your URL structure

      await cloudinary.uploader.destroy(`products/${publicId}`, (result) => {
        console.log(result); // Log the result of the image deletion
      });
    }

    // Delete the product from the database
    const deletedProduct = await prisma.products.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product and image deleted successfully', deletedProduct });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product and image' }, { status: 500 });
  }
}
