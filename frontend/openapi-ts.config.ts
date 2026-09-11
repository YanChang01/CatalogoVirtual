import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input:
    "https://catalogovirtualbackend-930b1295.fastapicloud.dev/openapi.json",
  output: {
    path: "src/lib/api",
    format: "prettier",
  },
  client: "axios",
  plugins: [
    {
      name: "@hey-api/client-axios",
    },
    {
      name: "@hey-api/typescript",
    },
    {
      name: "@hey-api/schemas",
    },
  ],
});
