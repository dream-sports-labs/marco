import React, { useEffect, useState } from 'react';
import { EmptyPage } from './EmptyPage';
import VisualizePage from './VisualizePage';
import type { IData } from '../App.interface';
import TimelineSelector from './TimeLineSelector';

const Home: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/log');
        const data = await res.json();
        // const data = require('../../../generated-perf-reports/log.json');
        setData(data);
      } catch (_) {
        setData([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  if (data.length === 0) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <TimelineSelector
        data={data}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {selectedTags.length === 2 ? (
        <VisualizePage
          data={data ?? []}
          startMarker={selectedTags[0] ?? ''}
          endMarker={selectedTags[1] ?? ''}
        />
      ) : (
        <EmptyPage />
      )}
    </div>
  );
};

export default Home;
