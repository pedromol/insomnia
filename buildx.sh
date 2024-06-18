docker buildx use localremote_builder

docker buildx build --push \
--platform linux/amd64,linux/arm64 \
--tag pedromol/insomnia:latest .
