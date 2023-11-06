import * as httpRequest from '../../ultils/httpRequest';

export const LoginService = async (email, password) => {
    try {
        const res = await httpRequest.post(
            '/login',
            {
                email: email,
                password: password,
            },
            {},
        );
        console.log('successLogin: ', res);
        return res;
    } catch (error) {
        console.log('errorLogin: ', error);
    }
};
