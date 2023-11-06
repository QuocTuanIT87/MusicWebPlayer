import * as httpRequest from '../../ultils/httpRequest';

export const CreateSongService = async (formData, token) => {
    try {
        const res = await httpRequest.post('/create-song', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successCreateSong: ', res);
        return res;
    } catch (error) {
        console.log('errorCreateSong: ', error);
    }
};
