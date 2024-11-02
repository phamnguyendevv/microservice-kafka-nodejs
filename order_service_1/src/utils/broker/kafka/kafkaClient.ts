// src/brokers/kafka/kafkaClient.ts
import { Kafka, logLevel } from "kafkajs";
import { CLIENT_ID, BROKERS } from "../../../config";

export const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});
