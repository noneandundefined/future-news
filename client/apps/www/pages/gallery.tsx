import { useEffect, useState } from "react";
import Plus from "../components/icons/plus"
import IndexLayout from "../components/layout/index-layout"
import { toast, ToastContainer } from "react-toastify";
import galleryAPI from "@/api/gallery.api";
import type { Gallery } from "@/app/types/gallery.type";

const Gallery = () => {
    const [isOpenSetGalleryModal, setIsOpenSetGalleryModal] = useState<boolean>(false);
    const [galleries, setGalleries] = useState<Gallery[]>([]);

    useEffect(() => {
        const sendRequest = async () => {
            const gallery = await galleryAPI.get();
            setGalleries(gallery);
        };

        sendRequest();

        const intervalId = setInterval(sendRequest, 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {isOpenSetGalleryModal && <ModalAddGallery />}
            <IndexLayout>
                <div className="flex flex-gap gap-3">
                    <div className="flex justify-center items-center border border-[#374151] rounded-[6px] p-6 min-h-[6rem] max-w-[11rem] min-w-[11rem] hover:bg-[#111] hover:border-[#fff] cursor-pointer" onClick={() => setIsOpenSetGalleryModal(!isOpenSetGalleryModal)}>
                        <Plus fill="#fff" />
                    </div>
                    {galleries.map((gallery, index) => (
                        <div key={index} className="min-h-[6rem] max-w-[11rem] cursor-pointer p-1 border border-[#374151] hover:border-[#fff] rounded-md">
                            <img src={`data:${gallery.format};base64,${gallery.content}`} alt="" className="rounded-md" />
                        </div>
                    ))}
                </div>
            </IndexLayout>
        </>
    )
}

const ModalAddGallery = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        setFile(selected);
    };

    const handleSetGallery = async () => {
        if (!file) {
            toast.error('the file is not selected.');
            return;
        }

        await galleryAPI.set(file);
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
            />

            <div className="absolute h-screen w-screen flex flex-col justify-center items-center">
                <div className="bg-[#000] border border-[#374151] rounded-[10px] p-6 min-w-[30%]">
                    <div className="flex flex-col">
                        <p className="text-[#fff] font-medium">Add gallery</p>
                        <label
                            htmlFor="hidden-file"
                            className="flex justify-center cursor-pointer my-3 bg-transparent border border-[#374151] text-white py-1 px-4 rounded-lg hover:bg-gray-700 transition text-[14px]"
                        >
                            <Plus fill="#fff" />
                        </label>

                        <input
                            id="hidden-file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {file && (
                            <p className="text-white text-sm mb-3">
                                Выбран файл: <strong>{file.name}</strong>
                            </p>
                        )}

                        <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition" onClick={handleSetGallery}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery
