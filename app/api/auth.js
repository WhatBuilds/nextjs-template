import api from './interceptor';


//example api calls, use try catch always
export const userSignUp = async (formData) => {
    try {
        const respone = await api.post(`/register/`, formData);
        return respone
    }
    catch (error) {
        console.log('Error in userSignUp::', error)
    }
};

export const userSignIn = async (formData) => {
    try {
        const response = await api.post(`/login/`, formData);
        return { authToken: response.data.key, data: response.data };
    }
    catch (error) {
        console.log('Error in userSignIn::', error)
    }
};


