# Notes on ingress-srv Configuration (Minikube)

As I am using minikube for this project, some requirements must have done before applying `ingres-srv` file:

## 1. Install Ingress-NGINX Controller

Apply the official Ingress-NGINX controller manifest:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.0/deploy/static/provider/cloud/deploy.yaml
```

## 2. Activate configs:

```bash
minikube addons enable ingress
```

## 3. Retrieve Minikube IP:

Use the following command to get the cluster's IP:

```bash
minikube ip
```

## 4. Update /etc/hosts

To resolve posts.com to your Minikube cluster locally, add the following line to your /etc/hosts file:

```
<minikube-ip> posts.com
```

Replace <minikube-ip> with the actual minikube IP.

## 5. Free Port 80 (If Needed)

```bash
sudo lsof -i tcp:80
```
