import { runAuthWorkflow } from "./registerAndAuth";
import * as fs from "fs";
import * as path from "path";

// --- CONFIGURATION ---
// Replace YOUR_MOBILE_NUMBER and YOUR_GITHUB_USERNAME below
const CONFIG = {
  email: "sm2460@srmist.edu.in",
  name: "sravani",
  mobileNo: "9150958505", 
  githubUsername: "sravani-2006",
  rollNo: "RA2311003020028",
  accessCode: "QkbpxH"
};

async function main() {
  try {
    process.stdout.write("Starting Affordmed Auth Workflow...\n");

    const result = await runAuthWorkflow(CONFIG);

    process.stdout.write("\n✅ STAGE 1: REGISTRATION SUCCESSFUL\n");
    process.stdout.write(`ClientID:     ${result.registration.clientID}\n`);
    process.stdout.write(`ClientSecret: ${result.registration.clientSecret}\n`);

    process.stdout.write("\n✅ STAGE 2: AUTHENTICATION SUCCESSFUL\n");
    process.stdout.write(`Token Type:   ${result.auth.token_type}\n`);
    process.stdout.write(`Access Token: ${result.auth.access_token}\n`);
    process.stdout.write(`Expires In:   ${result.auth.expires_in} seconds\n`);

    // Optionally save to a .env for future use
    const envContent = `ACCESS_TOKEN=${result.auth.access_token}\nCLIENT_ID=${result.registration.clientID}\nCLIENT_SECRET=${result.registration.clientSecret}\n`;
    fs.writeFileSync(path.join(__dirname, "../.env"), envContent);
    process.stdout.write("\n[INFO] Credentials saved to .env file for future requests.\n");

  } catch (error: any) {
    process.stderr.write(`\n❌ WORKFLOW FAILED\n`);
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}

main();
