@echo off

SET DIR=projects/padup
SET command=%*
SET known=false

echo.

IF "%command%"=="" (
  CALL :availabale_commands
  SET known=true
) 
IF "%command%"=="start" (
  CALL :sass %DIR%/scss/themes:%DIR%/css -s expanded -w --load-path %DIR%
  SET known=true
)  
IF "%command%"=="build" (
  CALL :bin rimraf %DIR%/css
  CALL :sass %DIR%/scss/themes:%DIR%/css --no-source-map
  CALL :bin postcss %DIR%/css --use autoprefixer --replace
  CALL :bin cleancss --batch --batch-suffix .min %DIR%/css/*.css
  SET known=true
)
IF %known%==false (
  echo Unknown command "%command%"
  CALL :availabale_commands
)

GOTO main

@REM Display all availabale commands
:availabale_commands
echo Availabales commands: & echo.
echo      - start & echo.
echo      - build
EXIT /B

@REM the bin function to add node_modules/bin prefix
:bin
SET COMMAND=%*
CALL .\node_modules\.bin\%COMMAND%
echo %COMMAND%
EXIT /B

@REM the sass function to run sass compiler
:sass
SET SASS_ARGUMENTS=
CALL :bin sass %*
EXIT /B

:main
echo.