param(
    [string]$Url = 'https://admin-tcga.twjoin.app/admin/login',
    [string]$OutputPath = 'tcga-admin-auth.json',
    [string]$BrowserChannel = 'chrome'
)

$userDataDir = Join-Path (Get-Location) '.playwright-userdata/tcga-admin-session'

Write-Host ''
Write-Host 'TCGA admin session export' -ForegroundColor Cyan
Write-Host '1. A browser window will open.'
Write-Host '2. Manually log in to the admin site.'
Write-Host '3. After you reach the logged-in page, close that browser window.'
Write-Host '4. Playwright will save the session to the JSON file below.'
Write-Host ''
Write-Host ('Output: ' + (Join-Path (Get-Location) $OutputPath)) -ForegroundColor Yellow
Write-Host ('Profile: ' + $userDataDir) -ForegroundColor Yellow
Write-Host ''

npx playwright open `
  --channel=$BrowserChannel `
  --user-data-dir="$userDataDir" `
  --save-storage="$OutputPath" `
  "$Url"

if (Test-Path $OutputPath) {
    Write-Host ''
    Write-Host ('Saved storage state to ' + (Join-Path (Get-Location) $OutputPath)) -ForegroundColor Green
    Write-Host 'You can now tell Copilot to continue testing with this file.' -ForegroundColor Green
} else {
    Write-Host ''
    Write-Host 'Storage state was not created.' -ForegroundColor Red
    Write-Host 'Make sure you logged in successfully and then closed the Playwright browser window.' -ForegroundColor Red
    exit 1
}