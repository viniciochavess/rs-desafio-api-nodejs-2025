import fastify from "fastify";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { getCoursesRoute } from "./routes/get-courses";
import { getCourseById } from "./routes/get-course-by-id";
import { createCourseRoute } from "./routes/create-course";
import scalaApiReference from "@scalar/fastify-api-reference";
import { env } from "./env";
const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

if (env.NODE_ENV === "development") {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        version: "1.0.0",
        title: "API de Cursos",
        description: "API para gerenciamento de cursos",
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(scalaApiReference, {
    routePrefix: "/docs",
  });
}

app.register(getCoursesRoute);
app.register(getCourseById);
app.register(createCourseRoute);

export default app;
