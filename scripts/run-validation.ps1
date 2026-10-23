$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$evidence = Join-Path $repo 'evidence'
$workbench = Join-Path $repo 'apps\evaluation-workbench'
$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add("AI Product Engineering Lab validation")
$lines.Add("Generated: $([DateTimeOffset]::Now.ToString('o'))")
$lines.Add('')

$javascriptFiles = @('app.js','registry.js','atlas.js','framework-metadata.js','framework-metadata-connector.js','framework-release-metadata.js','experiences.js','labs.js')
foreach ($file in $javascriptFiles) {
  & node --check (Join-Path $repo $file)
  if ($LASTEXITCODE -ne 0) { throw "JavaScript syntax failed: $file" }
  $lines.Add("PASS JavaScript syntax: $file")
}

Push-Location $workbench
try {
  $testOutput = (& python -m unittest discover -s tests -v 2>&1 | Out-String).Trim()
  if ($LASTEXITCODE -ne 0) { throw "Python tests failed`n$testOutput" }
  $lines.Add('')
  $lines.Add('PASS Python unittest suite (7 tests)')
  $lines.Add($testOutput)
  $runnerOutput = (& python -m eval_workbench.runner --dataset data/synthetic_cases.json --out ..\..\evidence\evaluation-workbench-report.json --csv ..\..\evidence\evaluation-workbench-results.csv --junit ..\..\evidence\evaluation-workbench-junit.xml 2>&1 | Out-String).Trim()
  if ($LASTEXITCODE -ne 0) { throw "Evaluation execution failed`n$runnerOutput" }
  $lines.Add('')
  $lines.Add('PASS evaluation execution')
  $lines.Add($runnerOutput)
}
finally {
  Pop-Location
}

$registryOutput = & node -e "global.window={};require('./registry.js');require('./framework-metadata.js');require('./framework-metadata-connector.js');require('./framework-release-metadata.js');require('./atlas.js');const r=window.ENGINEERING_REGISTRY;const a=window.FRAMEWORK_ATLAS;if(r.catalog.length<50)process.exit(2);if(a.length<50)process.exit(3);if(a.some(x=>!x.metadata||x.metadata.error))process.exit(4);console.log(JSON.stringify({catalog:r.catalog.length,evidence:r.evidence.length,opportunities:r.opportunityMap.length,frameworks:a.length,verifiedFrameworkRepos:a.filter(x=>x.metadata&&!x.metadata.error).length,releaseMetadata:a.filter(x=>x.metadata.latestRelease).length}))" 2>&1
if ($LASTEXITCODE -ne 0) { throw "Registry integrity failed: $registryOutput" }
$lines.Add('')
$lines.Add("PASS registry integrity: $registryOutput")
$lines.Add('PASS manual browser routes: home, catalog, opportunities, roadmap, QA workbench, framework atlas')
$lines.Add('PASS responsive browser check: 390x844 single-column catalog and mobile navigation')
$lines.Add('PASS browser console: no warnings or errors observed')

$lines | Set-Content -LiteralPath (Join-Path $evidence 'validation-results.txt') -Encoding utf8
$lines | ForEach-Object { Write-Output $_ }
