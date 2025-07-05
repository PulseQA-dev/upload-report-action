import testops from './testops.js'

try {
  const resp = await testops.uploadTestRunReport(
    'https://api.testops.cloudkon.net',
    process.env.TESTOPS_TOKEN,
    'testsha',
    'testbranch',
    '../testops/testing/results.xml',
  )

  console.log(resp)

} catch (error) {
  console.error('Error uploading test run report:', error.message);
  process.exit(1);
}

