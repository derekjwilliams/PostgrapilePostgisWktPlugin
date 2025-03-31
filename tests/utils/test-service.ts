import { ChildProcess, exec } from 'child_process';
import { once } from 'events';
import treeKill from 'tree-kill';

let serviceProcess: ChildProcess | null = null;

export async function startTestService(): Promise<void> {
  return new Promise((resolve, reject) => {
    serviceProcess = exec('npm run start', {
      cwd: './tests/test-service',
      env: {
        ...process.env,
        NODE_ENV: 'test',
        DATABASE_URL: process.env.TEST_DB_URL || 'postgres://postgres:postgres@localhost:5432/wkt_postgraphile_test'
      }
    });

    // Buffer for capturing startup output
    let output = '';
    
    // Handle service startup messages
    serviceProcess.stdout?.on('data', (data: Buffer) => {
      output += data.toString();
      process.stdout.write(`[Test Service] ${data}`); // Pipe to test output

      // Resolve when service is ready
      if (data.includes('Server running on')) {
        resolve();
      }
    });

    serviceProcess.stderr?.on('data', (data: Buffer) => {
      process.stderr.write(`[Test Service ERR] ${data}`);
    });

    serviceProcess.on('error', reject);
    
    // Fail if service doesn't start within 30s
    setTimeout(() => {
      reject(new Error('Test service startup timeout'));
    }, 30000);
  });
}

export async function stopTestService(): Promise<void> {
  if (!serviceProcess) return;

  return new Promise((resolve) => {
    if (serviceProcess && serviceProcess.pid) {
    treeKill(serviceProcess.pid, 'SIGTERM', (err) => {
      if (err) console.error('Error stopping service:', err);
      serviceProcess = null;
      resolve();
    });
  }
  });
}