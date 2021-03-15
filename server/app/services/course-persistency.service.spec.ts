import { expect } from 'chai';
import { Course } from '../../../common/communication/course';
import { testingContainer } from '../../test/test-utils';
import { DbCollection } from '../classes/db-collection';
import Types from '../types';
import { CoursePersistenceService } from './course-persistency.service';

describe('Course persistence service', () => {
    let coursePersistenceService: CoursePersistenceService;

    beforeEach(async () => {
        const [container, sandbox] = await testingContainer();
        sandbox.stub(DbCollection.prototype, 'findOne').resolves({acronym: 'toto'} as Course);
        coursePersistenceService = container.get<CoursePersistenceService>(Types.CoursePersistenceService);
    });

    it('should test', (done: Mocha.Done) => {
        coursePersistenceService.getCourse('toto').then((result) => {
            expect(result).to.deep.equal({acronym: 'toto'} as Course);
            done();
        }).catch((reason) => {
            console.error('Error');
            done(reason);
        });
    });
});
