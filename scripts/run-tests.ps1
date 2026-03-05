#!/usr/bin/env pwsh

Write-Host "Running Playwright tests..." -ForegroundColor Green

# Set environment variables
$env:CI = "true"

# Run tests with list reporter for clear output
& node_modules\.bin\playwright test --reporter=list

# Check exit code
if ($LASTEXITCODE -eq 0) {
    Write-Host "All tests passed!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}
