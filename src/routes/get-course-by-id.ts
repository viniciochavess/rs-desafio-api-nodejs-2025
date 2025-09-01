import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/drizzle/drizzle";
import { courses } from "../database/drizzle/schema";
import { eq } from "drizzle-orm";

export const getCourseById: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/courses/:id",
    {
      schema: {
        params: z.object({
          id: z.coerce.number().min(1),
        }),
        tags: ["course"],
        summary: "Obter um curso pelo ID",
        description: "Esta rota permite obter um curso específico pelo seu ID.",
        response: {
          200: z.object({
            course: z.object({
                id: z.coerce.number().min(1),
                title: z.string().min(3).max(100),
                description: z.string().min(10).max(500).nullable(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      console.log(`Buscando curso com ID: ${id}`);
      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.id, id))
        .limit(1)
        .get();
      if (!course) {
        return reply.status(404).send({ message: "Curso não encontrado" });
      }
      return reply.status(200).send({ course });
    }
  );
};
