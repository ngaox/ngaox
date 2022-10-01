// import * as path from 'path';
// import * as fs from 'fs-extra';

// import { fileExists } from '../filesystem';
// import { PERIODIC_MANIFEST } from '../../models/constants';

// export async function getContestManifest(dir: string, filePath: string) {
//   const periodicManifestPath = path.join(
//     dir,
//     path.dirname(filePath),
//     PERIODIC_MANIFEST
//   );
//   const isPeriodic = await fileExists(periodicManifestPath);
//   if (isPeriodic) {
//     const manifest = await fs.readJson(periodicManifestPath);
//     return manifest;
//   }
//   return undefined;
// }
