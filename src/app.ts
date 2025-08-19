import fastify from "fastify";
import { randomUUID } from "node:crypto";
const app = fastify({
  logger: {
      transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  
});

let courses = [
  { id: "1", title: "Curso 1", description: "Descrição do Curso 1" },
  { id: "2", title: "Curso 2", description: "Descrição do Curso 2" },
  { id: "3", title: "Curso 3", description: "Descrição do Curso 3" },
];

app.get("/courses/:id", async (request, reply) => {
  type Params = {
    id: string;
  };
  const { id } = request.params as Params;
  console.log(`Buscando curso com ID: ${id}`);
  const course = courses.find((c) => c.id == id);
  if (!course) {
    return reply.status(404).send({ message: "Curso não encontrado" });
  }
  return course;
});

app.get("/courses", async (request, reply) => {
  return courses;
});

app.post("/courses", async (request, reply) => {
  type CreateCourseBody = {
    title: string;
    description: string;
  };
  const { description, title } = request.body as CreateCourseBody;
  const id = randomUUID();
  courses.push({ id, title, description });
  return reply.status(201).send({ id });
});

export default app;
