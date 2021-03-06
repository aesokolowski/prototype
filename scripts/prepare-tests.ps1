### note: intended to be run from the home project directory, not the scripts
### folder, for automation purposes

$a1 = $args[0]
$test_files_js = ".\src\test\ts\transpiled\test_files\*.js"
$transpiled_js = ".\src\test\ts\transpiled\*.js"
$test_files_ts = ".\src\test\ts\test_files\*.ts"

$struct_dir = "src\main\ts\struct\"
$test_files_dir = "src\test\ts\test_files\"

if ($a1 -ieq "--clean" -or $a1 -ieq "-c") {
    Write-Output "removing test files..."
    if (Test-Path -Path $test_files_js -Type Leaf) {
        Remove-Item $test_files_js
    }
    if (Test-Path -Path $transpiled_js -Type Leaf) {
        Remove-Item $transpiled_js
    }
    if (Test-Path -Path $test_files_ts -Type Leaf) {
        Remove-Item $test_files_ts
    }
} else {
    Write-Output "cleaning skipped: use with --clean to clear test directories"
}

Write-Output "copying main files to test directory..."
$struct = Get-ChildItem $struct_dir -Name -Filter *.ts
$temp_list = @()

foreach($file in $struct) {
    $newName = "temp_test_" + $file
    $from = $struct_dir + $file
    $to = $test_files_dir + $newName

    Copy-Item -Path $from -Destination $to
    $temp_list += $to
}

Write-Output "modifying exports for each file..."
foreach($temp in $temp_list) {
    $pattern = 'export { xWinCondition, oWinConditions }'
    Write-Output $pattern
    Write-Output $temp
    $lineToBeModified = Select-String -Path $temp -Pattern $pattern

    Write-Output $lineToBeModified
}