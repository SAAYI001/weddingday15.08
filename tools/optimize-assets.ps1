$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root "assets"

Add-Type -AssemblyName System.Drawing

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }

$encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality,
  [int64]82
)

$images = @(
  "hero-wedding-reference",
  "hero-invitation-cover",
  "opening-invitation",
  "dress-moodboard-girls"
)

foreach ($name in $images) {
  $source = Join-Path $assets "$name.png"
  $target = Join-Path $assets "$name.jpg"

  if (-not (Test-Path -LiteralPath $source)) {
    Write-Host "Skip missing $source"
    continue
  }

  $sourceImage = [System.Drawing.Image]::FromFile($source)
  try {
    $canvas = New-Object System.Drawing.Bitmap $sourceImage.Width, $sourceImage.Height
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($canvas)
      try {
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.DrawImage($sourceImage, 0, 0, $sourceImage.Width, $sourceImage.Height)
      } finally {
        $graphics.Dispose()
      }

      $canvas.Save($target, $jpegEncoder, $encoderParameters)
      Write-Host "Wrote $target"
    } finally {
      $canvas.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

$textFiles = @("index.html", "invite.html", "style.css", "script.js")

foreach ($file in $textFiles) {
  $path = Join-Path $root $file
  if (-not (Test-Path -LiteralPath $path)) {
    continue
  }

  $content = Get-Content -LiteralPath $path -Raw
  foreach ($name in $images) {
    $content = $content.Replace("assets/$name.png", "assets/$name.jpg")
  }
  Set-Content -LiteralPath $path -Value $content -NoNewline -Encoding UTF8
}
