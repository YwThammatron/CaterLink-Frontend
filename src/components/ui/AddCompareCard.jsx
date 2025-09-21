import { Button } from "./button";

function AddCompareCard() {
  return (
    <div className="flex flex-col w-[284px] h- border border-[#D0D5DD] pb-4 gap-8 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl">
      <div className="pt-2 w-full flex justify-center">
        <div className="bg-gray-200 p-2 rounded-lg flex justify-center items-center w-[266px] h-[226px]">
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="px-4">
        <Button className="bg-gradient text-white w-full font-semibold">
          เพิ่มร้าน
        </Button>
      </div>
    </div>
  );
}

export default AddCompareCard;
