import * as core from "@actions/core";
import * as github from "@actions/github";

function main() {
  const token = core.getInput('token')
  const reportFile = core.getInput('report-file')
  const branch = core.getInput('branch') || github.context.ref.replace('refs/heads/', '');
  const commitSha = core.getInput('commit-sha') || github.context.sha;

  core.info(JSON.stringify({
    token,
    reportFile,
    branch,
    commitSha,
  }))

  core.setOutput('run-id', '')
}

try {
  main()
} catch (error) {
  core.setFailed(error.message);
}

