cd "${0%/*}" #set the script execution location the place where the script is located, and not from where it's called
cd ../client-app

# assume the client app is already built
# npm run-script build

docker build -t proteo-pile-ui:0.1 .