GCP_PROJECT = _
GCP_APP_NAME = fitness-tracker
GCP_REGION = _

IMAGE_NAME = $(GCP_REGION)-docker.pkg.dev/$(GCP_PROJECT)/cloud-run/$(GCP_APP_NAME)

lint:
	npm run lint

prisma-schema:
	npm run prisma:generate

run-migrations:
	npm run migrate

install-dependencies:
	npm install

test-unit:
	npm run prisma:generate
	npm run test:unit

test-integration:
	npm run prisma:generate
	npm run test:integration:ci

test:
	npm run prisma:generate
	npm run test:unit
	npm run test:integration:ci

docker-tag-latest:
	docker tag $(IMAGE_NAME):$(TAG) $(IMAGE_NAME):latest
	docker push $(IMAGE_NAME):latest

docker-build:
	docker build --build-arg DATABASE_URL=${DATABASE_URL} -t $(IMAGE_NAME):$(TAG) .

docker-push:
	docker push $(IMAGE_NAME):$(TAG)

gcp-deploy:
	export IMAGE=$(IMAGE_NAME):$(TAG)
	gcloud run deploy $(GCP_APP_NAME) --image ${IMAGE_NAME} --project $(GCP_PROJECT) --region $(GCP_REGION)
