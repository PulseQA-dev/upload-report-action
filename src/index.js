import * as core from "@actions/core";
import * as github from "@actions/github";
import testops from "./testops";

async function main() {
  const token = core.getInput('token')
  const reportFilepath = core.getInput('report-file')
  const branch = core.getInput('branch') || github.context.ref.replace('refs/heads/', '');
  const commitSha = core.getInput('commit-sha') || github.context.sha;
  const apiRootUrl = core.getInput('api-root-url') || 'https://api.testops.cloudkon.net'

  const runId = await testops.uploadTestRunReport(
    apiRootUrl, token, commitSha, branch, reportFilepath,
  )

  core.setOutput('run-id', runId)
}

try {
  await main()
} catch (error) {
  core.setFailed(error.message);
}

