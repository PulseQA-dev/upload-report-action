import axios from "axios";
import fs from 'fs';

/**
  * Uploads a test run report to the PulseQA API.
  * @param {string} apiRootUrl - The base URL of the PulseQA API.
  * @param {string} token - The API token for authentication.
  * @param {string} commitSha - The SHA of the commit associated with the test run.
  * @param {string} branch - The branch name associated with the test run.
  * @param {string} reportFilepath - The path to the test run report file.
  * @return {Promise<string>} - A promise that resolves to the run ID of the uploaded report.
**/
async function uploadTestRunReport(apiRootUrl, token, commitSha, branch, reportFilepath) {
  const url = `${apiRootUrl}/projects/-/results`
  const headers = {
    'x-project-token': token
  }
  const reportFile = await fs.openAsBlob(reportFilepath)

  const formData = new FormData();
  formData.append('metadata', JSON.stringify({
    branch: branch,
    commit: commitSha
  }));
  formData.append('testResults', reportFile)

  const resp = await axios.post(url, formData, {
    headers: {
      ...headers,
      ...formData.headers
    }
  })

  return resp.data;
}

export default {
  uploadTestRunReport
}

