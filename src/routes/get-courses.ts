import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/drizzle/drizzle";
import { courses } from "../database/drizzle/schema";
import z from "zod";

const courseSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(3).max(100),
  description: z.string().nullable(),
});

export const getCoursesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/courses",
    {
      schema: {
        tags: ["course"],
        summary: "Listar todos os cursos",
        description: "Retorna a lista de cursos disponíveis no banco de dados.",
        response: {
          200: z.object({
            courses: z.array(courseSchema),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await db.select().from(courses);
        return reply.status(200).send({ courses: result });
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        return reply.status(500).send({ message: "Erro ao buscar cursos" });
      }
    }
  );
};
