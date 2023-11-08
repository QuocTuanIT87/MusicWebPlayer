import styles from './UploadPage.module.scss';
import classNames from 'classnames/bind';
import listCateSong from './CateSongs';
import { useContext, useRef, useState } from 'react';
import { CreateSongService } from '../../service/Song/CreateSongService';
import LoadingItem from '../../components/LoadingItem';
import NotifyItem from '../../components/NotifyItem/NotifyItem';
import { formContext } from '../../components/FormProvider/FormProvider';

const cx = classNames.bind(styles);

function UploadPage() {
    const contextForm = useContext(formContext);

    const [isFileImage, setIsFileImage] = useState(false);
    const [isFileMp3, setIsFileMp3] = useState(false);
    const [srcImage, setSrcImage] = useState();
    const [srcMp3, setSrcMp3] = useState();
    const [playing, setPlaying] = useState(false);
    const [nameSongInput, setNameSongInput] = useState();
    const [isValidMp3, setIsValidMp3] = useState(true);

    // Các field để tạo một bài hát
    const [nameSong, setNameSong] = useState('');
    const [singer, setSinger] = useState('');
    const [cate, setCate] = useState('Nhạc trẻ');
    const [fileMp3, setFileMp3] = useState();
    const [fileImage, setFileImage] = useState();
    const [des, setDes] = useState('');
    const [lyric, setLyric] = useState('');

    // Thông báo trả về khi đăng bài hát
    const [notify, setNotify] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUploadSong = async () => {
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('name_song', nameSong);
        formData.append('lyric', lyric);
        formData.append('audio', fileMp3);
        formData.append('song_description', des);
        formData.append('avatar_song', fileImage);
        formData.append('category', cate);
        formData.append('singer', singer);

        setLoading(true);
        const result = await CreateSongService(formData);
        setLoading(false);
        if (result.data.errCode !== 0) {
            setNotify(result.data.message);
        } else {
            contextForm.setIsShowFormUpload(true);
            setTimeout(() => {
                contextForm.setIsShowFormUpload(false);
            }, 3000);
        }
    };

    const audioInputRef = useRef();

    const toggle = () => {
        if (playing) {
            setPlaying(!playing);
            audioInputRef.current.pause();
        } else {
            setPlaying(!playing);
            audioInputRef.current.play();
        }
    };

    const handleFileImageChange = (e) => {
        setNotify(null);
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setIsFileImage(true);
            setSrcImage(URL.createObjectURL(selectedFile));
            setFileImage(selectedFile);
        }
    };

    const handleFileMp3Change = (e) => {
        setNotify(null);
        const selectedFile = e.target.files[0];
        setNameSongInput(selectedFile?.name);
        if (!selectedFile?.name.endsWith('.mp3')) {
            setIsValidMp3(false);
        } else {
            if (selectedFile) {
                setIsFileMp3(true);
                setSrcMp3(URL.createObjectURL(selectedFile));
                setFileMp3(selectedFile);
            }
        }
    };

    const handleOptionCate = (e) => {
        const target = e.target;
        const selectedValue = target.options[target.selectedIndex].label;
        setCate(selectedValue);
        setNotify(null);
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <LoadingItem />}
            {contextForm.isShowFormUpload && <NotifyItem />}
            <h2>Đăng tải bài hát của bạn</h2>
            <div className={cx('container')}>
                <div action="/upload" className={cx('form-control-upload')}>
                    <div className={cx('inner-form')}>
                        <div className={cx('left-form')}>
                            <div className={cx('cover-name-song')}>
                                <label className={cx('label-name-song')}>Tên bài hát</label>
                                <input
                                    className={cx('input-name-song')}
                                    type="text"
                                    spellCheck={false}
                                    onChange={(e) => {
                                        setNameSong(e.target.value);
                                        setNotify(null);
                                    }}
                                />
                            </div>
                            <div className={cx('cover-singer-song')}>
                                <label className={cx('label-singer-song')}>Tên ca sĩ</label>
                                <input
                                    className={cx('input-singer-song')}
                                    type="text"
                                    spellCheck={false}
                                    onChange={(e) => {
                                        setSinger(e.target.value);
                                        setNotify(null);
                                    }}
                                />
                            </div>

                            <div className={cx('cover-option-cate')}>
                                <label className={cx('cate-label')}>Thể loại</label>
                                <select
                                    className={cx('option-cate')}
                                    id="theloai"
                                    name="theloai"
                                    required
                                    onChange={handleOptionCate}
                                >
                                    {listCateSong.map((item, index) => (
                                        <option className={cx('selected-option')} key={index} value={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={cx('control-files')}>
                                <div className={cx('cover-file', 'mr-16')}>
                                    <label htmlFor="audio-upload">
                                        Chọn file bài hát
                                        <i
                                            style={{ lineHeight: '20px' }}
                                            className={cx('fa-solid fa-microphone-lines', 'text-white', 'fl-r')}
                                        ></i>
                                    </label>
                                    <input
                                        id="audio-upload"
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleFileMp3Change}
                                    />
                                    {isFileMp3 && (
                                        <div className={cx('cover-mp3-input')}>
                                            <audio
                                                ref={audioInputRef}
                                                controls
                                                className={cx('mp3-file-input')}
                                                src={srcMp3}
                                            />

                                            <span className={cx('name-song-input')}>{nameSongInput}</span>
                                            {playing ? (
                                                <i
                                                    className={cx('fa-regular fa-circle-pause', 'icon-play-input')}
                                                    onClick={toggle}
                                                ></i>
                                            ) : (
                                                <i
                                                    className={cx('fa-regular fa-circle-play', 'icon-play-input')}
                                                    onClick={toggle}
                                                ></i>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className={cx('cover-file')}>
                                    <label htmlFor="image-song">
                                        Chọn file ảnh
                                        <i
                                            style={{ lineHeight: '20px' }}
                                            className={cx('fa-regular fa-image', 'text-white', 'fl-r')}
                                        ></i>
                                    </label>
                                    <input
                                        id="image-song"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileImageChange}
                                    />
                                    {isFileImage && (
                                        <div className={cx('cover-img-input')}>
                                            <img className={cx('img-file-input')} src={srcImage} alt="avatar-song" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={cx('cover-btn-post')}>
                                {notify && (
                                    <div className={cx('notify')}>
                                        <i className="fa-solid fa-circle-exclamation"></i> {notify}
                                    </div>
                                )}
                                <input
                                    className={cx('btn-post')}
                                    type="submit"
                                    value="Đăng"
                                    onClick={handleUploadSong}
                                />
                            </div>
                        </div>
                        <div className={cx('right-form')}>
                            <div className={cx('cover-des-song')}>
                                <label className={cx('label-des-song')}>Mô tả bài hát</label>
                                <textarea
                                    spellCheck={false}
                                    className={cx('input-des-song')}
                                    onChange={(e) => setDes(e.target.value)}
                                />
                            </div>
                            <div className={cx('cover-des-song')}>
                                <label className={cx('label-des-song')}>Lyric</label>
                                <textarea
                                    className={cx('input-lyric-song')}
                                    spellCheck={false}
                                    onChange={(e) => setLyric(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;
