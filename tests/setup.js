import chai from 'chai';
import chaiHttp from 'chai-http';

/**
 * Exports chai with the registered chai-http plugin
 *
 * @returns {Object} Chai
 */
export default chai.use(chaiHttp);

export { expect } from 'chai';
