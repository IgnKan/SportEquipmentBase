FROM openjdk:17-jdk-alpine

ARG JAR_FILE=./sportbox-api.jar
ADD ${JAR_FILE} sportbox-api.jar

ENTRYPOINT ["java", "-jar", "/sportbox-api.jar"]