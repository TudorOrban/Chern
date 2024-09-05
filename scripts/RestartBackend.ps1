param (
    [string]$rebuildImage = "true"
)

Clear-Host

Push-Location -Path "../backend"

Write-Host "Stopping backend..."
docker-compose down

if ($rebuildImage -eq "true") {
    Write-Host "Rebuilding backend..."
    npm run build

    Write-Host "Rebuilding backend image..."
    docker-compose build --no-cache
}

Write-Host "Starting backend..."
docker-compose up