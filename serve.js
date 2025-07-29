import { createServer } from 'vite';

async function startServer() {
  try {
    const server = await createServer({
      // any valid user config options, plus `mode` and `configFile`
      configFile: './vite.config.ts',
      root: process.cwd(),
      server: {
        port: 5173,
        host: 'localhost',
        strictPort: true
      }
    });
    
    await server.listen();
    
    server.printUrls();
    console.log('Server is running...');
    
    // Keep the process alive
    process.on('SIGINT', async () => {
      await server.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();