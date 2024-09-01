import { FaRecycle } from "react-icons/fa6";
import { GiSolarPower } from "react-icons/gi";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { PiBatteryChargingVerticalFill } from "react-icons/pi";

const iconSize = 50;
const color = "#42BE55";

export const CATEGORIES = [
  {
    id: 1,
    title: "Renewable Energy",
    icon: <PiBatteryChargingVerticalFill size={iconSize} color={color} />,
    totalCourse: 10,
  },
  {
    id: 2,
    title: "Sustainable Policy",
    icon: <FaRecycle size={iconSize} color={color} />,
    totalCourse: 15,
  },
  {
    id: 3,
    title: "Energy Management",
    icon: <MdEnergySavingsLeaf size={iconSize} color={color} />,
    totalCourse: 32,
  },
  {
    id: 4,
    title: "Solar Power Systems",
    icon: <GiSolarPower size={iconSize} color={color} />,
    totalCourse: 50,
  },
];
