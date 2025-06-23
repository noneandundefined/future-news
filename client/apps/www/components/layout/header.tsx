import { useState } from "react"
import DotsVertical from "../icons/dots-vertical"
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    return (
        <header className="z-10 flex justify-between items-center px-6 py-4 border-b border-[#222]">
            {isOpenMenu && <Menu />}

            <div />
            <nav className="flex space-x-6 text-sm">
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-[#ff0000d9] rounded-full" />
                    <p className="text-white">LIVE</p>
                </div>

                <div className="cursor-pointer" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                    <DotsVertical fill="#fff" />
                </div>
            </nav>
        </header>
    )
}

const Menu = () => {
    return (
        <>
            <div className="absolute top-[4rem] right-[3.4rem] z-[11]">
                <div className="flex flex-col bg-[#000] border border-[#374151] rounded-[6px]">
                    <Link to="/gallery" className="text-[#fff] hover:text-[#fff] px-5 py-1 text-[14px] cursor-pointer hover:bg-[#222] rounded-[6px]">Gallery</Link>
                    <Link to="/stream" className="text-[#fff] hover:text-[#fff] px-5 py-1 text-[14px] cursor-pointer hover:bg-[#222] rounded-[6px]">Stream</Link>
                </div>
            </div>
        </>
    )
}

export default Header
