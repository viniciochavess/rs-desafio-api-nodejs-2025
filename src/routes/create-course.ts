import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/drizzle/drizzle";
import { courses } from "../database/drizzle/schema";

export const createCourseRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/courses",
    {
      schema: {
        body: z.object({
          title: z.string().min(3).max(100),
          description: z.string().min(10).max(500).optional(),
        }),
        tags: ["course"],
        summary: "Criar um novo curso",
        description: "Esta rota permite criar um novo curso.",
        response: {
          201: z.object({
            id: z.number().min(1),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body;

      const course = await db
        .insert(courses)
        .values({ title, description })
        .returning();
      return reply.status(201).send({ id: course[0].id });
    }
  );
};
