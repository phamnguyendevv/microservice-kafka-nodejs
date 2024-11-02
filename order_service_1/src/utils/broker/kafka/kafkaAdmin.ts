// src/brokers/kafka/kafkaAdmin.ts
import { kafka } from "./kafkaClient";

export const createTopic = async (topics: string[]): Promise<void> => {
  const topicConfigs = topics.map((t) => ({
    topic: t,
    numPartitions: 2,
    replicationFactor: 1,
  }));

  const admin = kafka.admin();
  await admin.connect();
  const existingTopics = await admin.listTopics();

  for (const t of topicConfigs) {
    if (!existingTopics.includes(t.topic)) {
      await admin.createTopics({ topics: [t] });
    }
  }

  await admin.disconnect();
};
