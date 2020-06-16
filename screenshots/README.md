
## Deployment Pipeline
* DockerHub showing containers that you have pushed

![Dockerhub containers](./dockerhub containers.png)

* GitHub repository’s settings showing your Travis webhook (can be found in Settings - Webhook)

![Travis Webhook](./github-travis-webhook.png)

* Travis CI showing a successful build and deploy job

![Travis CI](./travis-ci.png)

## Kubernetes
* To verify Kubernetes pods are deployed properly
```bash
kubectl get pods
```
![k8s get pods](./kubectl-get-pods.png)

* To verify Kubernetes services are properly set up
```bash
kubectl describe services
```

![k8s describe services](./kubectl-describe-services.png)

* To verify that you have horizontal scaling set against CPU usage
```bash
kubectl describe hpa
```
![k8s describe hpa](./kubectl-describe-hpa.png)

* To verify that you have set up logging with a backend application
```bash
kubectl logs {pod_name}
```
![k8s logs](./kubectl-logs.png)
