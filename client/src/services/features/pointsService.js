import { api } from '../core/apiMethods';

export const pointsService = {
  getRewardRanking({ course, year = 'ALL', search = '', limit = 200, offset = 0 } = {}) {
    return api.get('/points/reward', {
      params: { course, year, search, limit, offset },
    });
  },

  getActivityIndividualRanking({ course, year = 'ALL', search = '', limit = 200, offset = 0 } = {}) {
    return api.get('/points/activity/individual', {
      params: { course, year, search, limit, offset },
    });
  },

  getGroupAverageRanking({ search = '', limit = 200, offset = 0 } = {}) {
    return api.get('/points/activity/groups', {
      params: { search, limit, offset },
    });
  },

  getStudentTransactions(regNum) {
    return api.get(`/points/transactions/student/${regNum}`);
  },

  getGroupMembersPoints(groupId) {
    return api.get(`/points/activity/groups/${groupId}/members`);
  },
};
