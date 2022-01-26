import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaConnection from '../../../config/connecction';

type Related = {
  title: string;
  description: string;
};

type ResponseMessage = {
  message?: string;
  error?: string;
};

type TermResearched = {
  term: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
  relateds: Related[];
};

type ResponseData = TermResearched | ResponseMessage;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>,
) {
  const prisma = PrismaConnection.getConnection();
  const term = request.query.term as string;
  const termExists = await prisma.term.findFirst({ where: { term } });

  if (termExists) {
    return response.status(403).send({ error: 'exist' });
  }

  try {
    const result = await axios.get(
      `https://data.easycontent.com/api/v1/wikipedia?term=${term}`,
    );

    if (result) {
      const termFind = result.data as TermResearched;
      const { term: termResult, relateds } = termFind;
      const data = { ...termResult, term };

      await prisma.term.create({
        data: {
          ...data,
          relateds: {
            create: relateds,
          },
        },
      });

      return response.status(200).json({ message: 'salvo' });
    }
    return response.status(500).json({ error: 'Outro erro não mapeado' });
  } catch (e) {
    return response.status(404).json({ error: 'notFound' });
  }
}
