pipeline {
    environment {
        DOCKERHUB_REGISTRY = credentials('todo-app-dockerhub-registry')
        registryCredential = 'dockerHub'
    }

    agent any

    stages {
        stage('Build Docker image for dockerhub') {
            steps {
                script {
                    dockerImage = docker.build("$env.DOCKERHUB_REGISTRY:$env.BUILD_NUMBER", "--platform linux/amd64 .")
                }
            }
        }
        stage('Deploy Docker image to dockerhub') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
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
    }
}