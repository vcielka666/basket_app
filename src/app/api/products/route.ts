// src/pages/api/products/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { shopCenterName, productName, productWeight, productPrice } = req.body;
      console.log("Received data:", { shopCenterName, productName, productWeight, productPrice });

      const product = await prisma.products.create({
        data: {
          shopCenterName,
          productName,
          productWeight,
          productPrice,
        },
      });

      console.log("Created product:", product);
      res.status(200).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await prisma.products.findMany();
      console.log("Fetched products:", products);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
