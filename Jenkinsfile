pipeline {
  //Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  triggers {
    pollSCM('@hourly')
	}
  
  options {
		buildDiscarder(logRotator(numToKeepStr: '5'))
		disableConcurrentBuilds()
	}

stages{

  //Aquí comienzan los “items” del Pipeline
  stage('Checkout'){
  	steps{
      echo "------------>Checkout<------------"
      checkout([
        $class: 'GitSCM',
        branches: [[name: '*/master']],
        doGenerateSubmoduleConfigurations: false,
        extensions: [],
        gitTool: 'Default',
        submoduleCfg: [],
        userRemoteConfigs: [[
          credentialsId: 'GitHub_FelipeFranco-Ceiba',
          url:'https://github.com/FelipeFranco-Ceiba/ceiba-odontologia-front.git'
        ]]
      ])
    }
  }

    stage('compilar '){
      steps {
        echo '------------>Install and Build<------------'
        sh 'npm i'
        sh 'npm run build'					
      }
    }
    
    stage('test '){
        steps {
          echo '------------>Unit Tests<------------'
          sh 'npm test'					
			}
    }

    stage('Lint') {
      steps{
        echo '------------>Análisis de código estático<------------'
        sh 'ng lint'
      }
    }

	stage('Sonar Analysis'){
    steps{
      echo '------------>Analisis de código estático<------------'
			withSonarQubeEnv('Sonar') {
        sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=ceiba:CeibaOdontologiaFront.felipe.bedoya -Dsonar.projectName=Ceiba-ADNFront(felipe.bedoya) -Dproject.settings=./sonar-project.properties"
      }
    }
  }

    stage('Build') {
      steps {
        echo "------------>Build<------------"
        sh 'ng build --prod --progress=false'
      }
    }
  }
  
  post {
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail(to: 'felipe.bedoya@ceiba.com.co',
      subject: "Failed Pipeline:${currentBuild.fullDisplayName}",
      body: "Something is wrong with ${env.BUILD_URL}")
    }
  }
}
