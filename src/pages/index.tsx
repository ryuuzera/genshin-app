import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { NextPage } from 'next';
import HomePage from './Homepage';

const cache = createCache({
  key: 'css',
  prepend: true,
});

const Home: NextPage = () => {
  return (
    <div>
      <CacheProvider value={cache}>
        <HomePage />
      </CacheProvider>
    </div>
  );
};

export default Home;
