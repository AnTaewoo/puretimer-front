import { Dispatch, SetStateAction } from "react";

interface ValueType {
  img: string;
  title: string;
  description: string;
}

interface PropType {
  value: ValueType;
  index: number;
  listActive: number[];
  setListActive: Dispatch<SetStateAction<number[]>>;
}

export default function Accordion({
  value,
  index,
  listActive,
  setListActive,
}: PropType) {
  const clickList = (index: number) => {
    const newListActive = listActive.map((active, i) =>
      i == index ? (active != 1 ? 1 : 0) : listActive[index] != 1 ? 2 : 0
    );

    setListActive(newListActive);
  };

  return (
    <li
      className=" bg-slate-50 rounded-xl p-14 flex flex-col items-center transition-all duration-500 shrink-0"
      style={{
        width:
          listActive[index] == 0
            ? `${100 / listActive.length}%`
            : listActive[index] == 1
            ? "50%"
            : `${50 / (listActive.length - 1)}%`,
        scale: listActive[index] == 1 ? "1.1" : "1",
        filter: listActive[index] != 2 ? "none" : "grayscale(100%)",
        opacity:
          listActive[index] == 1
            ? "1"
            : listActive[index] == 2
            ? "0.5"
            : "0.95",
      }}
      onClick={() => clickList(index)}
    >
      <div className="w-60 h-60 mb-10 shrink-0">
        <img
          src={value.img}
          alt={value.title}
          className=" w-full h-full object-contain "
        />
      </div>
      <p className=" text-slate-900 text-5xl font-extrabold text-center leading-[80px] font-sans">
        {value.title}
      </p>
      <p
        className=" text-slate-400 text-xl font-extrabold text-center font-sans break-keep"
        style={{
          visibility: listActive[index] == 1 ? "visible" : "hidden",
          opacity: listActive[index] == 1 ? "1" : "0",
          transition: "opacity 0.5s ease-in 0.1s",
        }}
      >
        {value.description}
      </p>
    </li>
  );
}
