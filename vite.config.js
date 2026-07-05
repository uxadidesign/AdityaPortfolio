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
        project_bigul: resolve(__dirname, 'project_bigul.html'),
        project_bigul_apiconnect: resolve(__dirname, 'project_bigul_apiconnect.html'),
        project_bigul_kyc: resolve(__dirname, 'project_bigul_kyc.html'),
        project_bigul_algo: resolve(__dirname, 'project_bigul_algo.html'),
        project_kimirica: resolve(__dirname, 'project_kimirica.html'),
        project_bigul_mutualfund: resolve(__dirname, 'project_bigul_mutualfund.html'),
        project_bigul_support: resolve(__dirname, 'project_bigul_support.html'),
        project_withdrawal_module: resolve(__dirname, 'project_withdrawal_module.html'),
        project_kimirica_mobile: resolve(__dirname, 'project_kimirica_mobile.html'),
        project_tinyjewels: resolve(__dirname, 'project_tinyjewels.html'),
        project_dinepass: resolve(__dirname, 'project_dinepass.html'),
        project_kansa: resolve(__dirname, 'project_kansa.html')
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
