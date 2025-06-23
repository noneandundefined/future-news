import Plus from "../components/icons/plus"
import IndexLayout from "../components/layout/index-layout"

const Gallery = () => {
    return (
        <IndexLayout>
            <div className="flex justify-center items-center border border-[#374151] rounded-[6px] p-6 max-w-[10%] hover:bg-[#111] cursor-pointer">
                <Plus fill="#fff" />
            </div>
        </IndexLayout>
    )
}

export default Gallery
