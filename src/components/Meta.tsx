import { Helmet } from 'react-helmet';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BASE_URL, DESCRIPTION, TYPE } from '../constants/meta';
import { useEffect, useState } from 'react';
import { punyDecode } from '../helpers/domain/punyDecode.helper';

const spinnerFrames = ['◐', '◓', '◑', '◒'];

const Meta: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const [currentSpinnerFrame, setCurrentSpinnerFrame] = useState(
    () => spinnerFrames[0]
  );

  const domain = searchParams.get('domain');

  const decodedDomain = domain && punyDecode(domain);

  const title = `${loading ? currentSpinnerFrame + ' - ' : ''}  ${
    decodedDomain ? decodedDomain + ' - ' : ''
  }DomainLookup`;
  const currentUrl = BASE_URL + pathname + search;

  useEffect(() => {
    if (!loading) return;
    const spinnerInterval = setInterval(() => {
      setCurrentSpinnerFrame(prev => {
        const nextIndex =
          (spinnerFrames.indexOf(prev) + 1) % spinnerFrames.length;

        return spinnerFrames[nextIndex];
      });
    }, 250);

    return () => clearInterval(spinnerInterval);
  }, [loading]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={TYPE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={`${BASE_URL}/og-dl.png`} />
      <meta property="og:url" content={currentUrl} />
    </Helmet>
  );
};

export default Meta;
