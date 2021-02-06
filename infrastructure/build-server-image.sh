cd "${0%/*}" #set the script execution location the place where the script is located, and not from where it's called
cd ../server-app

docker build -f ./automation/dockerfile -t proteo-pile-server:0.1 .
