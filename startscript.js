const cmd = require("node-cmd");

// pm2 start  startscript --name "NomeDaAplicacao" --exp-backoff-restart-delay=100
// yarn sucrase ./src -d ./dist --transforms typescript,imports

cmd.run("yarn run production");
