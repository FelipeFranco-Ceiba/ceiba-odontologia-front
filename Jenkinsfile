pipeline {
  //Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  //Opciones específicas de Pipeline dentro del Pipeline
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
    disableConcurrentBuilds()
  }

  //Una sección que define las herramientas “preinstaladas” en Jenkins
  tools {
    jdk 'JDK8_Centos' //Preinstalada en la Configuración del Master
    gradle 'Gradle5.6_Centos' //Preinstalada en la Configuración del Master
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

    stage('NPM Install') {
      steps{
        echo "------------>Compile<------------"
        withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
          sh 'npm install'
		    }
      }
    }

    stage('Unit Tests') {
      steps{
        echo "------------>Unit Tests<------------"
        sh 'ng test --browsers ChromeHeadless --progress=false --watch false --code-coverage'
      }
    }

    stage('Lint') {
      steps{
        echo '------------>Análisis de código estático<------------'
        sh 'ng lint'
      }
    }

	stage('Static Code Analysis') {
    steps{
      echo '------------>Análisis de código estático<------------'
      withSonarQubeEnv('Sonar') {
        sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
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
      mail(to: 'felipe.bedoya@ceiba.com.co', subject: "Failed Pipeline:${currentBuild.fullDisplayName}", body: "Something is wrong with ${env.BUILD_URL}")
    }
  }
}
