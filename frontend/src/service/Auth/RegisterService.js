import * as httpRequest from '../../ultils/httpRequest';

export const RegisterService = async (email, lastName, firstName, password, birthday) => {
    try {
        const res = await httpRequest.post(
            '/register',
            {
                email: email,
                lastName: lastName,
                firstName: firstName,
                password: password,
                birthday: birthday,
            },
            {},
        );
        console.log('successRegister: ', res);
        return res;
    } catch (error) {
        console.log('errorRegister: ', error);
    }
};
