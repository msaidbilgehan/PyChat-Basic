echo "> Activating virtual environment..."
source venv/bin/activate

echo "> Creating pyinstaller spec file with __pyinstaller__/dist as output directory..."
pyinstaller --workpath "__pyinstaller__" --distpath "__pyinstaller__/dist" 3AGEPoseApp_unix_executable.spec

echo "> Deactivating virtual environment..."
deactivate

echo "> Moving executable to frontend directory..."
mv __pyinstaller__/dist/3AGEPoseApp ./3AGEPoseApp_console

echo "> Removing __pyinstaller__ directory..."
rm -rf __pyinstaller__

echo "> Done!"