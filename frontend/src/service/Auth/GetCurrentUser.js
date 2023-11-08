import * as httpRequest from '../../ultils/httpRequest';

export const GetCurrentUser = async () => {
    try {
        const res = await httpRequest.get('/user-current', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successGetUserCurrent: ', res);
        return res;
    } catch (error) {
        console.log('errorGetUserCurrent: ', error);
    }
};
