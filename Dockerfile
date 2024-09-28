FROM jelastic/maven:3.9.5-openjdk-21 AS buildstage
WORKDIR /app
COPY . /app
RUN mvn clean install

FROM openjdk:21-jdk
COPY --from=buildstage /app/target/*.jar /app.jar
ENTRYPOINT ["java","-jar","app.jar"]
