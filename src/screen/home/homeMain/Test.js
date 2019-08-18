import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';

import BackgroundTask from 'react-native-background-task'
import queueFactory from 'react-native-queue';

BackgroundTask.define(async () => {

  // Init queue
  queue = await queueFactory();

  // Register worker
  queue.addWorker('background-example', async (id, payload) => {

    // Load some arbitrary data while the app is in the background
    if (payload.name == 'luke') {
      await AsyncStorage.setItem('lukeData', 'Luke Skywalker arbitrary data loaded!');
    } else {
      await AsyncStorage.setItem('c3poData', 'C-3PO arbitrary data loaded!');
    }

  });

  // Start the queue with a lifespan
  // IMPORTANT: OS background tasks are limited to 30 seconds or less.
  // NOTE: Queue lifespan logic will attempt to stop queue processing 500ms less than passed lifespan for a healthy shutdown buffer.
  // IMPORTANT: Queue processing started with a lifespan will ONLY process jobs that have a defined timeout set.
  // Additionally, lifespan processing will only process next job if job.timeout < (remainingLifespan - 500).
  await queue.start(20000); // Run queue for at most 20 seconds.

  // finish() must be called before OS hits timeout.
  BackgroundTask.finish();

});

export default class Test extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      queue: null,
      data: null
    };

    this.init();

  }

  async init() {

    const queue = await queueFactory();

    // Add the worker.
    queue.addWorker('background-example', async (id, payload) => {
      // Worker has to be defined before related jobs can be added to queue.
      // Since this example is only concerned with OS background task worker execution,
      // We will make this a dummy function in this context.
      console.log(id);
    });

    // Attach initialized queue to state.
    this.setState({
      queue
    });

  }

  componentDidMount() {
    BackgroundTask.schedule(); // Schedule the task to run every ~15 min if app is closed.
  }

  makeJob(jobName, payload = {}) {
    console.log('job is created but will not execute until the above OS background task runs in ~15 min');
    this.state.queue.createJob(jobName, payload, {

      timeout: 5000 // IMPORTANT: If queue processing is started with a lifespan ie queue.start(lifespan) it will ONLY process jobs with a defined timeout.

    }, false); // Pass false so queue doesn't get started here (we want the queue to start only in OS background task in this example).
  }

  async checkData() {

    const lukeData = await AsyncStorage.getItem('lukeData');
    const c3poData = await AsyncStorage.getItem('c3poData');

    this.setState({
      data: {
        lukeData: (lukeData) ? lukeData : 'No data loaded from OS background task yet for Luke Skywalker.',
        c3poData: (c3poData) ? c3poData : 'No data loaded from OS background task yet for C-3PO.'
      }
    });

  }

  render() {

    let output = 'No data loaded from OS background task yet.';
    if (this.state.data) {
      output = JSON.stringify(this.state.data);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text>Click buttons below to add OS background task jobs.</Text>
        <Text>Then Close App (task will not fire if app is in focus).</Text>
        <Text>Job will exec in ~15 min in OS background.</Text>
        {this.state.queue && <Button title={"Press To Queue Luke Skywalker Job"} onPress={ () => { this.makeJob('background-example', { name: 'luke' }) } } /> }
        {this.state.queue && <Button title={"Press To Queue C-3PO Job"} onPress={ () => { this.makeJob('background-example', { name: 'c3po' }) } } /> }
        <Button title={"Check if Data was loaded in OS background"} onPress={ () => { this.checkData() } } />
        <Text>{output}</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});