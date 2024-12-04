pipeline {
    environment {
        DOCKERHUB_REGISTRY = credentials('todo-app-dockerhub-registry')
        REGISTRY_CRED = 'dockerHub'
        AZURE_CRED = credentials('azureServicePrincipal')
        AZURE_CONFIG_DIR = '/tmp/.azure'
    }

    agent any

    stages {
        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build("$env.DOCKERHUB_REGISTRY:$env.BUILD_NUMBER", "--platform linux/amd64 .")
                }
            }
        }
        stage('Push image to DockerHub') {
            steps {
                script {
                    docker.withRegistry( '', REGISTRY_CRED ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Clean up images') {
            steps {
                sh "docker rmi $env.DOCKERHUB_REGISTRY:$env.BUILD_NUMBER" 
                // sh "docker image prune -a -f"
            }
        }

        stage('Deploy to Azure') {
            agent {
                docker {
                    image 'mcr.microsoft.com/azure-cli'
                }
            }
            steps {
                sh 'az login --service-principal -u $AZURE_CRED_CLIENT_ID -p $AZURE_CRED_CLIENT_SECRET -t $AZURE_CRED_TENANT_ID'
                sh 'az account show'
                sh "az webapp config container set --name helenazzz --resource-group cosmosdb --docker-custom-image-name $env.DOCKERHUB_REGISTRY:$env.BUILD_NUMBER --docker-registry-server-url https://index.docker.io/v1/"
            }
        }
    }
}