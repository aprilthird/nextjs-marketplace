import Image from "next/image";

export default function RootNotFound() {
  return (
    <div className="min-h-[600px] flex flex-col justify-center items-center space-y-4 font-bold text-center text-lg">
      <Image
        src={"/assets/images/not_found.png"}
        alt="icon"
        width={300}
        height={300}
      />
      <div>Página no encontrada</div>
    </div>
  );
}
