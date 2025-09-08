import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Resolve "@" to the "src" directory
      // eslint-disable-next-line
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      // eslint-disable-next-line
      entry: path.resolve(__dirname, "src/index.ts"), // Entry file of library
      name: "EmailTemplateBuilder", // Global variable name for UMD
      fileName: (format) => `email-template-builder-lib.${format}.js`,
    },
    rollupOptions: {
      // Externalize React and ReactDOM to avoid bundling them in the library
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    minify: "esbuild", // Minification with esbuild for faster builds
    sourcemap: true, // Include sourcemaps for easier debugging
  },
});
