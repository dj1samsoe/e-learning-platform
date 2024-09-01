import { FaPeopleRoof } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";
import { RiDiscussFill, RiMoneyDollarCircleFill } from "react-icons/ri";

const iconSize = 50;

export const ADVANTAGES = [
  {
    id: 1,
    icon: <RiDiscussFill color="#DF562B" size={iconSize} />,
    title: "Belajar dari Ahlinya",
    description:
      "Dipandu secara langsung oleh praktisi yang berpengalaman di bidangnya",
    backgroundColor: "bg-[#FCEDE9]",
  },
  {
    id: 2,
    icon: <PiTreeStructureFill color="#29616E" size={iconSize} />,
    title: "Beragam Pilihan Belajar",
    description:
      "Pelajari penyusunan perencanaan dari berbagai format media pembelajaran sesuai pilihan Anda",
    backgroundColor: "bg-[#ECF6F8]",
  },
  {
    id: 3,
    icon: <FaPeopleRoof color="#E4AA00" size={iconSize} />,
    title: "Komunitas Kabupaten di Indonesia",
    description:
      "Dapatkan dukungan dari berbagai Kabupaten dalam komunitas yang semakin bertumbuh",
    backgroundColor: "bg-[#FFF9E5]",
  },
  {
    id: 4,
    icon: <RiMoneyDollarCircleFill color="#656565" size={iconSize} />,
    title: "Semuanya Gratis!",
    description:
      "Semua materi pembelajaran dan bantuan profesional dapat Anda akses tanpa dipungut biaya sama sekali",
    backgroundColor: "bg-[#FCF6E9]",
  },
];
