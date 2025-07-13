# PulseQA Upload Report GitHub Action

## How to use

To upload your test report to PulseQA.dev, use this GitHub Action:

```yaml
jobs:
  pulseqa:
    name: Upload test run report to PulseQA.dev
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - id: run-tests
        run: |
          pytest
      - id: pulseqa-upload-report
        if: (!cancelled())
        uses: github.com/PulseQA-pro/pulseqa@main
        with:
          token: ${{ secrets.PULSEQA_PROJECT_TOKEN }}
          report-file: api/report.xml
```
