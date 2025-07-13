import pulseqa from './pulseqa.js'

try {
  const resp = await pulseqa.uploadTestRunReport(
    'https://api.pulseqa.dev',
    process.env.PULSEQA_PROJECT_TOKEN,
    'testsha',
    'testbranch',
    '../testops/testing/results.xml',
  )

  console.log(resp.runId)

} catch (error) {
  console.error('Error uploading test run report:', error.message);
  process.exit(1);
}

