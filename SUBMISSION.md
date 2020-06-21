
## Deployment Pipeline
* DockerHub showing containers that you have pushed

![Dockerhub containers](./screenshots/dockerhub-push-services-success.png)

* GitHub repository’s settings showing your Travis webhook (can be found in Settings - Webhook)

![Travis Webhook](./screenshots/github-travis-webhook.png)

* Travis CI showing a successful build and deploy job

![Travis CI](./screenshots/travis-docker-compose-build-success.png)

## Kubernetes
* To verify Kubernetes pods are deployed properly
```bash
kubectl get pods
```
![k8s get pods](./screenshots/kubectl-apply-services-success.png)

* To verify Kubernetes services are properly set up
```bash
kubectl describe services
```

![k8s describe services](./screenshots/kubectl-describe-services-success.png)

* To verify that you have horizontal scaling set against CPU usage
```bash
kubectl describe hpa
```
![k8s describe hpa](./screenshots/kubectl-get-hpa-success.png)

* To verify that you have set up logging with a backend application
```bash
kubectl logs {pod_name}
```
![k8s logs](./screenshots/kubectl-logs.png)
