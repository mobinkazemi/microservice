# Notes About Ingres-srv file

As I am using minikube for this project, some requirements must have done before applying `ingres-srv` file:

1. Apply ingres-nginx configs to the cluster

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.0/deploy/static/provider/cloud/deploy.yaml
```

2. Active configs:

```bash
minikube addons enable ingress
```

3. Find minikube ip using below command:

```bash
minikube ip
```

4. Edit **/etc/hosts** to resolve **posts.com** from minikube. Add below line:

```
<minikube-ip> posts.com
```

5. Ensure no service is running on port 80:

```bash
sudo lsof -i tcp:80
```
