import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Timer } from './components/Timer/Timer';
import Countdown from './components/Countdown/Countdown';

const { TabPane } = Tabs;

function App() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Таймер" key="1">
        <Timer />
      </TabPane>
      <TabPane tab="Обратный отчет" key="2">
        <Countdown />
      </TabPane>
    </Tabs>
  );
}

export default App;
