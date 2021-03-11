### note: intended to be run from the home project directory, not the scripts
### folder, for automation purposes

$a0 = $args[0]
$test_root = ".\src\test\ts\"
$test_files_js = $test_root + "transpiled\test_files\*.js"
$transpiled_js = $test_root + "transpiled\*.js"
$test_files_ts = $test_root + "test_files\*.ts"

$struct_dir = "src\main\ts\struct\"
$test_files_dir = $test_root + "test_files\"
$tf_dest_dir = $test_root + "transpiled\test_files\"
$test_dest_dir = $test_root + "transpiled\"

if ($a0 -ieq "--clean" -or $a0 -ieq "-c") {
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

##

Write-Output "copying main files to test directory..."
$struct = Get-ChildItem $struct_dir -Name -Filter *.ts
$test_list = @()

foreach($file in $struct) {
    if (-not ($file -Like '*Types.ts')) {  # ignore Type files for now
        $newName = "test_" + $file
        $from = $struct_dir + $file
        $to = $test_files_dir + $newName

        Copy-Item -Path $from -Destination $to
        $test_list += $to
    }
}

Write-Output "modifying exports for each file..."
foreach($test in $test_list) {
    $find_export = '^export { (\w+,? ?)+ };$'
    $line_to_modify = Select-String -Path $test -Pattern $find_export
    $ltm_idx = $line_to_modify.LineNumber - 1

    $export_names = ([regex]'\w+').Matches($line_to_modify.Line)
    $new_line_start = "module.exports = { "
    $new_line_end = " };"
    $count = $export_names.Count

    # start at 1 because 0 should be the word export itself every time
    for ($i = 1; $i -lt $count; $i++) {
        $new_line_start += $export_names[$i].Value
        $new_line_start += If ($i -eq $count - 1) `
                {$new_line_end} Else {", "}
    }

    $file_contents = Get-Content $test
    $file_contents[$ltm_idx] = $new_line_start
    $file_contents | Set-Content $test
}

Write-Output "compiling typescript files..."
foreach($test_file in $test_list) {
    tsc $test_file --outDir $tf_dest_dir
}

$tests = Get-ChildItem $test_root -Name -Filter *.ts
foreach($test in $tests) {
    $file_name = $test_root + $test
    tsc $file_name --outDir $test_dest_dir
}

Write-Output "...done."