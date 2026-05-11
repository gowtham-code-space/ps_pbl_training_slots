import * as trainingServices from './training.services.js';
import { successResponse, internalServerErrorResponse } from '../../utils/response.js';

export const getCategories = async (req, res) => {
  try {
    const data = await trainingServices.getCategories();
    return successResponse(res, 'Training categories fetched', data);
  } catch (error) {
    console.error('Error in getCategories:', error);
    return internalServerErrorResponse(res, error.message || 'Failed to fetch training categories');
  }
};

export const getSkills = async (req, res) => {
  try {
    const { type, categoryId, search, limit, offset } = req.query;
    const data = await trainingServices.getSkills({ type, categoryId, search, limit, offset });
    return successResponse(res, 'Training skills fetched', data);
  } catch (error) {
    console.error('Error in getSkills:', error);
    return internalServerErrorResponse(res, error.message || 'Failed to fetch training skills');
  }
};

export const getSkillDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await trainingServices.getSkillDetails(id);
    return successResponse(res, 'Training skill details fetched', data);
  } catch (error) {
    console.error('Error in getSkillDetails:', error);
    return internalServerErrorResponse(res, error.message || 'Failed to fetch training skill details');
  }
};

export const getSkillSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await trainingServices.getSkillSlots(id);
    return successResponse(res, 'Training slots fetched', data);
  } catch (error) {
    console.error('Error in getSkillSlots:', error);
    return internalServerErrorResponse(res, error.message || 'Failed to fetch training slots');
  }
};
