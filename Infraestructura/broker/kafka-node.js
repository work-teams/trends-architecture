const kafka = require('kafka-node');

/**
 * KAFKA CLIENT
 */
const basicKafkaClient = new kafka.KafkaClient();

const optionsKafkaClient = new kafka.KafkaClient({
  kafkaHost: 'localhost:9092',
  connectTimeout: 1000,
  requestTimeout: 1000,
  autoConnect: true,
  sslOptions: {},
  clientId: 'client id',
  connectRetryOptions: {
    retries: 5, factor: 0, minTimeout: 1000, maxTimeout: 1000, randomize: true
  }
});

optionsKafkaClient.connect();

/**
 * KAFKA PRODUCER
 */
const optionsProducer = new kafka.Producer(basicKafkaClient, { requireAcks: 0, ackTimeoutMs: 0, partitionerType: 0 });

const producer = new kafka.Producer(basicKafkaClient);
producer.on('error', (error) => {
  console.error('Error in Kafka Producer: ', error);
});
producer.on('ready', () => {
  const messages = [
    { topic: 'topicName', messages: ['message body'], partition: 0, attributes: 2 },
    { topic: 'topicName', messages: ['message body'], partition: 0 },
    { topic: 'topicName', messages: ['message body'], attributes: 0 },
    { topic: 'topicName', messages: ['message body'] },
    { topic: 'topicName', messages: [new kafka.KeyedMessage('key', 'message')] }
  ];

  producer.send(messages, (err) => {
    if (err) {
      console.error('Error sending message: ', err);
    }
  });

  producer.createTopics(['t'], true, (err, data) => {
    if (err) {
      console.error('Error creating topics: ', err);
    }
  });

  producer.close();
});

/**
 * KAFKA HIGH LEVEL PRODUCER
 */
const highLevelProducer = new kafka.HighLevelProducer(basicKafkaClient);

highLevelProducer.on('error', (error) => {
  console.error('Error in Kafka High Level Producer: ', error);
});
highLevelProducer.on('ready', () => {
  const messages = [
    { topic: 'topicName', messages: ['message body'], attributes: 2 },
    { topic: 'topicName', messages: ['message body'], partition: 0 },
    { topic: 'topicName', messages: ['message body'], attributes: 0 },
    { topic: 'topicName', messages: ['message body'] },
    { topic: 'topicName', messages: [new kafka.KeyedMessage('key', 'message')] }
  ];

  highLevelProducer.send(messages, (err) => {
    if (err) {
      console.error('Error sending message: ', err);
    }
  });

  highLevelProducer.createTopics(['t'], true, (err, data) => {
    if (err) {
      console.error('Error creating topics: ', err);
    }
  });

  highLevelProducer.close();
});

/**
 * KAFKA CONSUMER
 */
const fetchRequests = [{ topic: 'awesome' }];
const consumer = new kafka.Consumer(basicKafkaClient, fetchRequests, { groupId: 'abcde', autoCommit: true });

consumer.on('error', (error) => {
  console.error('Error in Kafka Consumer: ', error);
});
consumer.on('offsetOutOfRange', (error) => {
  console.error('Offset out of range: ', error);
});
consumer.on('message', function (message) {
  console.log('Received message:', message);
  // Handle the message here
});

consumer.addTopics(['t1', 't2'], (err, added) => {
  if (err) {
    console.error('Error adding topics: ', err);
  }
});

consumer.addTopics([{ topic: 't1', offset: 10 }], (err, added) => {
  if (err) {
    console.error('Error adding topics: ', err);
  }
}, true);

consumer.removeTopics(['t1', 't2'], (err, removed) => {
  if (err) {
    console.error('Error removing topics: ', err);
  }
});

consumer.removeTopics('t2', (err, removed) => {
  if (err) {
    console.error('Error removing topics: ', err);
  }
});

consumer.commit((err, data) => {
  if (err) {
    console.error('Error committing offsets: ', err);
  }
});

consumer.commit(true, (err, data) => {
  if (err) {
    console.error('Error committing offsets: ', err);
  }
});

consumer.setOffset('topic', 0, 0);

consumer.pause();
consumer.resume();
consumer.pauseTopics(['topic1', { topic: 'topic2', partition: 0 }]);
consumer.resumeTopics(['topic1', { topic: 'topic2', partition: 0 }]);

consumer.close(true, () => {
  console.log('Consumer closed');
});

consumer.close((err) => {
  if (err) {
    console.error('Error closing consumer: ', err);
  } else {
    console.log('Consumer closed');
  }
});

/**
 * KAFKA CONSUMER GROUP
 */
const ackBatchOptions = { noAckBatchSize: 1024, noAckBatchAge: 10 };
const cgOptions = {
  kafkaHost: 'localhost:9092',
  batch: ackBatchOptions,
  groupId: 'groupID',
  id: 'consumerID',
  encoding: 'buffer',
  keyEncoding: 'buffer',
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  fromOffset: 'latest',
  migrateHLC: false,
  migrateRolling: true
};

const consumerGroup = new kafka.ConsumerGroup(cgOptions, ['topic1']);
consumerGroup.on('error', (err) => {
  console.error('Error in Kafka Consumer Group: ', err);
});
consumerGroup.on('connect', () => {
  console.log('Consumer Group connected');
});
consumerGroup.on('message', (msg) => {
  console.log('Received message from Consumer Group:', msg);
});

consumerGroup.close(true, (err) => {
  if (err) {
    console.error('Error closing Consumer Group: ', err);
  } else {
    console.log('Consumer Group closed');
  }
});

const offset = new kafka.Offset(basicKafkaClient);

offset.on('ready', () => {
  console.log('Offset ready');
});

offset.fetch([{ topic: 't', partition: 0, time: Date.now(), maxNum: 1 }, { topic: 't' }], (err, data) => {
  if (err) {
    console.error('Error fetching offsets: ', err);
  } else {
    console.log('Fetched offsets: ', data);
  }
});

offset.commit('groupId', [{ topic: 't', partition: 0, offset: 10 }], (err, data) => {
  if (err) {
    console.error('Error committing offsets: ', err);
  } else {
    console.log('Committed offsets: ', data);
  }
});

offset.fetchCommits('groupId', [{ topic: 't', partition: 0 }], (err, data) => {
  if (err) {
    console.error('Error fetching commits: ', err);
  } else {
    console.log('Fetched commits: ', data);
  }
});

offset.fetchLatestOffsets(['t'], (err, offsets) => {
  if (err) {
    console.error('Error fetching latest offsets: ', err);
  } else {
    console.log('Fetched latest offsets: ', offsets);
  }
});

offset.fetchEarliestOffsets(['t'], (err, offsets) => {
  if (err) {
    console.error('Error fetching earliest offsets: ', err);
  } else {
    console.log('Fetched earliest offsets: ', offsets);
  }
});
