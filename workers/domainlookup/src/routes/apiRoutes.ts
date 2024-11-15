import { Router } from 'itty-router';
import { fetchDnsData } from '../handlers/dnsHandler';
import { fetchSslData } from '../handlers/sslHandler';
import { fetchWhoisData } from '../handlers/whoisHandler';

const router = Router();

router.get('/ssl', fetchSslData);
router.get('/whois', fetchWhoisData);
router.get('/dns', fetchDnsData);

export { router };
