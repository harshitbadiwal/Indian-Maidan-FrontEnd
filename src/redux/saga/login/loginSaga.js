import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../../actions/loginAction';
import axios from "axios";
import { BaseUrl } from '../../../services/utiles';

const loginApi = async (credentials) => {
  const url = BaseUrl + "/auth/login";
  try {
    const response = await axios.post(url, {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    
    // Check if response contains necessary data
    if (!response) {
      throw new Error('No response received from server');
    }

    // Different API might use different field names - adjust accordingly
    const token = response.token || response.access_token || response.jwt;
    const user = response.user || response.data;

    if (!token) {
      throw new Error('Token not found in response');
    }

    // Store authentication data
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    yield put(loginSuccess({
      user: user,
      token: token
    }));

    // Redirect after successful login
    window.location.href = "/";
    
  } catch (error) {
    console.error('Login error details:', {
      error: error,
      response: error.response,
      message: error.message
    });

    let errorMessage = 'Login failed. Please try again.';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMessage = error.response.data?.message || 
                    error.response.data?.error ||
                    error.response.statusText;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from server. Please check your connection.';
    }

    yield put(loginFailure(errorMessage));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}