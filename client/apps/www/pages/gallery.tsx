import Plus from "../components/icons/plus"
import IndexLayout from "../components/layout/index-layout"

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
    return (
        <>
            <div className="absolute h-screen w-screen">
                <div className="bg-[#000] border border-[#374151] rounded-[10px]">
                    sdfsdfsd
                </div>
            </div>
        </>
    )
}

export default Gallery
