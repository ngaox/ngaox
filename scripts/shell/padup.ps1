#!/usr/bin/env pwsh
param (
  $command = ""
)
$DIR = "projects/padup"
$AVAILABLE_COMMANDS = "Availabales commands:`n`t- start `n`t- build"

function bin {
  param (
    $cmd
  )
  invoke-expression -Command "./node_modules/.bin/$cmd"
}
function sass {
  param (
    $arg
  )
  bin -cmd "sass $arg"
}

if ($command -eq "") {
  Write-Output $AVAILABLE_COMMANDS;
}elseif ($command -eq "start") {
  sass -arg "$DIR/scss/themes:$DIR/css -s expanded -w"
}elseif ($command -eq "build") {
  bin -cmd "rimraf $DIR/css"
  sass -arg "$DIR/scss/themes:$DIR/css --no-source-map"
  bin -cmd "postcss $DIR/css --use autoprefixer --map --replace"
  bin -cmd "cleancss --batch --batch-suffix .min $DIR/css/*.css"
}else {
  Write-Output "Unknown command `"$COMMAND`"`n$AVAILABLE_COMMANDS";
}