'use client';

import { useEffect } from 'react';

import { initMixpanel } from '../lib/mixpanelClient';

const MixpanelComponent = () => {
  useEffect(() => {
    initMixpanel();
  }, []);

  return <></>;
};

export default MixpanelComponent;
