param(
    [string]$EnvFile = ".env.local"
)

$ErrorActionPreference = "Stop"

function Set-EnvironmentFromFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Env file not found: $Path"
    }

    Get-Content -LiteralPath $Path | ForEach-Object {
        $line = $_.Trim()

        if (-not $line -or $line.StartsWith("#")) {
            return
        }

        $parts = $line -split "=", 2
        if ($parts.Count -ne 2) {
            return
        }

        $key = $parts[0].Trim()
        $value = $parts[1].Trim()

        if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
            $value = $value.Substring(1, $value.Length - 2)
        }

        [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
}

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$resolvedEnvFile = Join-Path $scriptDirectory $EnvFile

Set-EnvironmentFromFile -Path $resolvedEnvFile

Push-Location $scriptDirectory
try {
    mvn spring-boot:run
}
finally {
    Pop-Location
}
