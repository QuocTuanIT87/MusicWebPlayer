import * as httpRequest from '../../ultils/httpRequest';

export const GetListSongService = async () => {
    try {
        const res = await httpRequest.get('/list-song', {});
        console.log('successGetListSong: ', res);
        return res;
    } catch (error) {
        console.log('errorGetListSong: ', error);
    }
};
