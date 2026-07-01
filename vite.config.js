import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        work: resolve(__dirname, 'work.html'),
        project: resolve(__dirname, 'project.html'),
        project_aero: resolve(__dirname, 'project_aero.html'),
        project_bigul: resolve(__dirname, 'project_bigul.html'),
        project_cubedots: resolve(__dirname, 'project_cubedots.html'),
        project_finflow: resolve(__dirname, 'project_finflow.html'),
        project_fittrack: resolve(__dirname, 'project_fittrack.html'),
        project_kimirica: resolve(__dirname, 'project_kimirica.html'),
        project_marvellous: resolve(__dirname, 'project_marvellous.html'),
        project_medix: resolve(__dirname, 'project_medix.html'),
        project_novapay: resolve(__dirname, 'project_novapay.html'),
        project_proptech: resolve(__dirname, 'project_proptech.html'),
        project_shanti: resolve(__dirname, 'project_shanti.html'),
        project_zenith: resolve(__dirname, 'project_zenith.html')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    open: true
  }
});
