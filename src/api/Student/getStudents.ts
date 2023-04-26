import API from '../../functions/api/API';
import { APIResponseBody } from '../../types/response';
import { Student } from '../../types/student';

export interface StudentResponse extends APIResponseBody {
  items: Student[];
}

const getStudents = async (): Promise<StudentResponse> => {
  try {
    const request = await API.get('/Student');
    const response: StudentResponse = request.data;
    return response;
  } catch (e) {
    console.error(e);
    const response: StudentResponse = {
      success: false,
      message: e.message,
      items: [],
    };
    return response;
  }
};

export default getStudents;
