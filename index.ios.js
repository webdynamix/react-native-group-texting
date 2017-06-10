'use strict';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/components/App';
import Widget from './app/components/Widget';

AppRegistry.registerComponent('OneTextApp', () => App);
AppRegistry.registerComponent('TodayWidget', () => Widget);
