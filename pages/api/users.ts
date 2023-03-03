import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
// import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
  }
}
