import { useState } from "react";
import Plus from "../components/icons/plus"
import IndexLayout from "../components/layout/index-layout"
import { ToastContainer } from "react-toastify";

const Gallery = () => {
    return (
        <>
            <ModalAddGallery />
            <IndexLayout>
                <div className="flex justify-center items-center border border-[#374151] rounded-[6px] p-6 min-h-[6rem] max-w-[10%] hover:bg-[#111] cursor-pointer">
                    <Plus fill="#fff" />
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

    const handleSetGallery = () => {
        if (!file) {
            
        }
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

                        <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery
