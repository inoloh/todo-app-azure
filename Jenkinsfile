pipeline {
    environment {
        DOCKERHUB_REGISTRY = credentials('todo-app-dockerhub-registry')
        registryCredential = 'dockerHub'
        MY_CRED = credentials('azureServicePrincipal')
        AZURE_CONFIG_DIR = '/tmp/.azure'
    }

    agent any

    stages {
        // stage('Build image') {
        //     steps {
        //         script {
        //             dockerImage = docker.build("$env.DOCKERHUB_REGISTRY:$env.BUILD_NUMBER", "--platform linux/amd64 .")
        //         }
        //     }
        // }
        // stage('Push image to DockerHub') {
        //     steps {
        //         script {
        //             docker.withRegistry( '', registryCredential ) {
        //                 dockerImage.push()
        //             }
        //         }
        //     }
        // }
        // stage('Clean up images') {
        //     steps {
        //         sh "docker rmi $env.DOCKERHUB_REGISTRY:$env.BUILD_NUMBER" 
        //         // sh "docker image prune -a -f"
        //     }
        // }
        stage('Log into Azure CLI') {
            agent {
                docker {
                    image 'mcr.microsoft.com/azure-cli'
                }
            }
            steps {
                //sh 'mkdir -p $AZURE_CONFIG_DIR'
                // sh 'export AZURE_CONFIG_DIR=/tmp/.azure'
                sh 'az login --service-principal -u $MY_CRED_CLIENT_ID -p $MY_CRED_CLIENT_SECRET -t $MY_CRED_TENANT_ID'
                sh 'az account show'
            }
        }
    }
}