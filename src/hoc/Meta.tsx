import { Helmet } from 'react-helmet';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BASE_URL, DESCRIPTION, TYPE } from '../constants/meta';
import { useEffect, useState } from 'react';

const spinnerFrames = ['◐', '◓', '◑', '◒'];

const Meta = ({ loading }: { loading?: boolean }) => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const [currentSpinnerFrame, setCurrentSpinnerFrame] = useState(
    () => spinnerFrames[0]
  );

  const domain = searchParams.get('domain');

  const title = `${loading ? currentSpinnerFrame + ' - ' : ''}  ${
    domain ? `${domain} - ` : ''
  }DomainLookup`;
  const currentUrl = BASE_URL + pathname + search;

  useEffect(() => {
    if (!loading) return;
    const spinnerInterval = setInterval(() => {
      setCurrentSpinnerFrame(prev => {
        const nextIndex =
          (spinnerFrames.indexOf(prev) + 1) % spinnerFrames.length;

        console.log(nextIndex);
        return spinnerFrames[nextIndex];
      });
    }, 200);

    return () => clearInterval(spinnerInterval);
  }, [loading]);

  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/dl-logo.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content={TYPE} />
      <meta name="og:description" content={DESCRIPTION} />
      <meta name="og:image" content={`${BASE_URL}/og-dl.png`} />
      <meta name="og:url" content={currentUrl} />
    </Helmet>
  );
};

export default Meta;
