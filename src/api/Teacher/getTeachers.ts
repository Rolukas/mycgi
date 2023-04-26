import API from '../../functions/api/API';
import { APIResponseBody } from '../../types/response';
import { Teacher } from '../../types/teacher';

export interface TeacherResponse extends APIResponseBody {
  items: Teacher[];
}

const getTeachers = async (): Promise<TeacherResponse> => {
  try {
    const request = await API.get('/Teacher');
    const response: TeacherResponse = request.data;
    return response;
  } catch (e) {
    console.error(e);
    const response: TeacherResponse = {
      success: false,
      message: e.message,
      items: [],
    };
    return response;
  }
};

export default getTeachers;
