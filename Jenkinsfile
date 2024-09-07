def project = "ddb-development"
def appName = "ms-fe-homespot"
def namespace = "mortgage"

pipeline {
  agent {
    kubernetes {
      label "jnlp-slave-${appName}-${env.BUILD_NUMBER}"
      defaultContainer "jnlp"
      yaml """
        apiVersion: v1
        kind: Pod
        metadata:
          labels:
            component: ci
        spec:
          # Use service account that can deploy to all namespaces
          serviceAccountName: cd2-jenkins
          containers:
          - name: gcloud
            image: google/cloud-sdk:272.0.0-alpine
            command:
            - cat
            tty: true
          - name: helm
            image: alpine/helm:2.14.0
            imagePullPolicy: IfNotPresent
            command:
            - cat
            tty: true
      """
    }
  }
  stages {
    stage('Quality Node') {
      when {
         branch 'develop-gcp'
       }
      environment {
        scannerHome = tool 'sonarscanner'
      }
      steps {
        script {
        try {
        withSonarQubeEnv('sonarqube') {
          sh "${scannerHome}/bin/sonar-scanner -X"
           }
        }
        catch (err) {
                echo 'Application Scanned'
          }
        }
      }
    }
    stage("Build Image") {
      environment {
        IMAGE_REPO = "gcr.io/${project}/${appName}"
        IMAGE_TAG = "${env.GIT_COMMIT.substring(0,7)}"
      }
      steps {
        container("gcloud") {
          withCredentials([file(credentialsId: "k8s-builder-prod", variable: "JSONKEY")]) {
            sh "cat ${JSONKEY} >> key.json"
            sh "gcloud auth activate-service-account --key-file=key.json"
            sh "gcloud builds submit --timeout=1h --project ${project} --tag ${IMAGE_REPO}:${IMAGE_TAG} ."
          }
        }
      }
    }
    stage("Development") {
      when {
        branch 'develop-gcp'
      }
      environment {
        IMAGE_REPO = "gcr.io/${project}/${appName}"
        IMAGE_TAG = "${env.GIT_COMMIT.substring(0,7)}"
      }
      steps {
        container("helm") {
          sh """
              helm upgrade ${appName} ./helm/${appName} \
                --set-string image.repository=${IMAGE_REPO},image.tag=${IMAGE_TAG} \
                -f ./helm/values.dev.yml  --debug --install --namespace ${namespace}
            """
        }
      }
    }
    stage("Master") {
      when {
        branch 'master'
      }
      environment {
        IMAGE_REPO = "gcr.io/${project}/${appName}"
        IMAGE_TAG = "${env.GIT_COMMIT.substring(0,7)}"
      }
      steps {
        container("helm") {
          sh """
              helm upgrade ${appName} ./helm/${appName} \
                --set-string image.repository=${IMAGE_REPO},image.tag=${IMAGE_TAG} \
                -f ./helm/values.prd.yml  --debug --install --namespace ${namespace}
            """
        }
      }
    }
  }
}

