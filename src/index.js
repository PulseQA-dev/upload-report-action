import * as core from "@actions/core";
import * as github from "@actions/github";
import testops from "./testops";

async function main() {
  const token = core.getInput('token')
  const reportFilepath = core.getInput('report-file')
  const branch = core.getInput('branch') || github.context.ref.replace('refs/heads/', '');
  const commitSha = core.getInput('commit-sha') || github.context.sha;
  const apiRootUrl = core.getInput('api-root-url') || 'https://api.pulseqa.dev'

  const { runId, runPath } = await testops.uploadTestRunReport(
    apiRootUrl, token, commitSha, branch, reportFilepath,
  )

  const uiUrl = apiRootUrl.replace('api.', '')

  core.info(`Test report uploaded to ${uiUrl}${runPath}`)

  core.setOutput('run-id', runId)
  core.setOutput('run-path', runPath)
}

try {
  await main()
} catch (error) {
  core.setFailed(error.message);
}

