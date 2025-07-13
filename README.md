# PulseQA Upload Report GitHub Action

Upload your test results to [PulseQA.dev](https://pulseqa.dev) for advanced test analytics, reporting, and insights.

## Features

- ✅ Supports JUnit XML format
- ✅ Works with pytest, Go's `go test`, and other JUnit XML compatible test frameworks
- ✅ Automatic test result upload to PulseQA.dev
- ✅ Integrates seamlessly with GitHub Actions workflows

## Prerequisites

1. Create a project at [PulseQA.dev](https://pulseqa.dev)
2. Get your project token from the PulseQA.dev dashboard
3. Add the token as a GitHub secret named `PULSEQA_PROJECT_TOKEN`

## Usage

```yaml
jobs:
  test-and-upload:
    name: Run tests and upload results to PulseQA.dev
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      
      - name: Run tests
        run: |
          pytest --junitxml=test-results.xml
      
      - name: Upload test results to PulseQA.dev
        if: always()  # Upload results even if tests fail
        uses: github.com/PulseQA-pro/pulseqa@main
        with:
          token: ${{ secrets.PULSEQA_PROJECT_TOKEN }}
          report-file: test-results.xml
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `token` | PulseQA.dev project token | ✅ Yes | - |
| `report-file` | Path to JUnit XML test report file | ✅ Yes | - |

## Examples

### Python with pytest

```yaml
- name: Run Python tests
  run: |
    pip install pytest
    pytest --junitxml=pytest-results.xml

- name: Upload to PulseQA.dev
  if: always()
  uses: github.com/PulseQA-pro/pulseqa@main
  with:
    token: ${{ secrets.PULSEQA_PROJECT_TOKEN }}
    report-file: pytest-results.xml
```

### Go with go test

```yaml
- name: Run Go tests
  run: |
    go test -v ./... | go-junit-report > go-test-results.xml

- name: Upload to PulseQA.dev
  if: always()
  uses: github.com/PulseQA-pro/pulseqa@main
  with:
    token: ${{ secrets.PULSEQA_PROJECT_TOKEN }}
    report-file: go-test-results.xml
```

### Java with Maven

```yaml
- name: Run Java tests
  run: |
    mvn test

- name: Upload to PulseQA.dev
  if: always()
  uses: github.com/PulseQA-pro/pulseqa@main
  with:
    token: ${{ secrets.PULSEQA_PROJECT_TOKEN }}
    report-file: target/surefire-reports/TEST-*.xml
```

## Setup Instructions

1. **Create a PulseQA.dev account** and project at [pulseqa.dev](https://pulseqa.dev)

2. **Get your project token** from the PulseQA.dev project dashboard

3. **Add the token to GitHub Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PULSEQA_PROJECT_TOKEN`
   - Value: Your PulseQA.dev project token

4. **Add the action to your workflow** using one of the examples above

## Supported Test Frameworks

This action supports any testing framework that can generate JUnit XML reports, including:

- **Python**: pytest, unittest, nose2
- **Go**: go test (with go-junit-report)
- **Java**: JUnit, TestNG, Maven Surefire
- **JavaScript**: Jest, Mocha (with junit reporters)
- **C#**: NUnit, xUnit, MSTest
- **PHP**: PHPUnit
- **Ruby**: RSpec (with junit formatter)

## Best Practices

- Use `if: always()` to ensure test results are uploaded even when tests fail
- Store your PulseQA.dev token as a GitHub secret, never hardcode it
- Generate JUnit XML reports in a consistent location for easy reference

## Support

For questions or issues:
- Visit [PulseQA.dev](https://pulseqa.dev) for platform support
- Create an issue in this repository for action-specific problems
