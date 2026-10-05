import { Bookmark, Share, Star } from "lucide-react";
import { toast } from "react-toastify";

// import { Bookmark, Heart } from "lucide-react";
// import { Avatar, AvatarImage } from "./ui/avatar";

export default function Card() {
  return (<></>
    //light mode
    // <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-5">
    //   <div className="relative w-full max-w-[445px]">
    //     {/* Background Glow */}
    //     <div className="absolute -inset-10 rounded-[80px] bg-gradient-to-b from-transparent via-cyan-100/40 to-cyan-300/50 blur-3xl" />

    //     {/* Card */}
    //     <div className="relative overflow-hidden rounded-[52px] border border-white/80 bg-white/30 shadow-[0_25px_70px_rgba(0,0,0,0.10)] backdrop-blur-[25px]">
    //       {/* Bottom blue glass gradient */}
    //       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-transparent via-cyan-100/25 to-cyan-300/70" />

    //       <div className="relative p-[38px] sm:p-[42px]">
    //         {/* Top Share */}
    //         <div className="flex justify-end">
    //           <button
    //             type="button"
    //             className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-white/50 active:scale-95"
    //             aria-label="Share"
    //           >
    //             <Share />
    //           </button>
    //         </div>

    //         {/* Profile */}
    //         <div className="mt-1">
    //           <div className="h-[94px] w-[94px] overflow-hidden rounded-full bg-[#b7e5fa] shadow-sm">
    //             <img
    //               src="https://i.pinimg.com/736x/fb/fe/5a/fbfe5ac3962e7efc98f4081aba98687b.jpg"
    //               alt="Chloe Harrison"
    //               className="h-full w-full object-cover"
    //             />
    //           </div>

    //           <h1 className="mt-5 text-[32px] font-medium leading-none tracking-[-1.5px] text-[#111111]">
    //             Chloe Harrison
    //           </h1>

    //           <p className="mt-2 text-[20px] leading-none text-[#777777]">
    //             Product designer
    //           </p>
    //         </div>

    //         {/* Tags */}
    //         <div className="mt-4 flex gap-2">
    //           <span className="rounded-full bg-white/40 px-4 py-2 text-[13px] text-[#777] shadow-sm">
    //             Figma
    //           </span>

    //           <span className="rounded-full bg-white/40 px-4 py-2 text-[13px] text-[#777] shadow-sm">
    //             UX Design
    //           </span>
    //         </div>

    //         {/* Stats */}
    //         <div className="mt-11 grid grid-cols-3">
    //           {/* Rating */}
    //           <div className="flex items-start gap-2">
    //             <div className="mt-[1px] text-black">
    //               <Star />
    //             </div>

    //             <div>
    //               <div className="text-[20px] font-medium leading-none">
    //                 4.5
    //               </div>

    //               <div className="mt-2 text-[15px] text-[#777]">
    //                 Rating
    //               </div>
    //             </div>
    //           </div>

    //           {/* Earned */}
    //           <div className="border-l border-white/70 pl-8">
    //             <div className="text-[20px] font-medium leading-none">
    //               $15K+
    //             </div>

    //             <div className="mt-2 text-[15px] text-[#777]">
    //               Earned
    //             </div>
    //           </div>

    //           {/* Rate */}
    //           <div className="border-l border-white/70 pl-8">
    //             <div className="text-[20px] font-medium leading-none">
    //               $80/hr
    //             </div>

    //             <div className="mt-2 text-[15px] text-[#777]">
    //               Rate
    //             </div>
    //           </div>
    //         </div>

    //         <div className="mt-9 flex items-center gap-4">
    //           {/* Liquid Glass Button */}
    //           <button
    //             type="button"
    //             className="relative flex h-[78px] flex-1 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/[0.12] text-[20px] font-medium text-[#111] backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(255,255,255,0.25),0_8px_30px_rgba(80,190,210,0.12)] transition-all duration-300 ease-out hover:bg-white/[0.18] hover:border-white/90 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(255,255,255,0.3),0_10px_35px_rgba(80,190,210,0.18)] active:scale-[0.985]"
    //           >
    //             {/* Top glass reflection */}
    //             <span className="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-white/45 via-white/10 to-transparent" />

    //             {/* Soft light/refraction */}
    //             <span className="pointer-events-none absolute -left-[12%] -top-[100%] h-[250%] w-[42%] rotate-[20deg] rounded-full bg-white/20 blur-2xl" />

    //             {/* Bottom subtle glass glow */}
    //             <span className="pointer-events-none absolute inset-x-[8%] bottom-1 h-[35%] rounded-full bg-cyan-200/10 blur-xl" />

    //             <span className="relative z-10">
    //               Get in touch
    //             </span>
    //           </button>

    //           {/* Bookmark — unchanged */}
    //           <button onClick={()=>toast.error("good buddy hi")}
    //             type="button"
    //             className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full  text-black shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition hover:scale-105 active:scale-95"
    //             aria-label="Save profile"
    //           >
    //             <Bookmark />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    
    //self made
    // <div className="w-full h-150 flex justify-center items-center">
    //   {/* <div className="w-80 h-110 bg-white rounded-sm bg-[#fafafa] bg-gradient-to-b from-[#fafafa] from-30% to-[#46f3fc] to-100%
    //         bg-white/30 backdrop-blur-md border border-white/20 shadow-sm hover:scale-105 transition-all duration-200 ease-in-out transform  hover:shadow-lg cursor-pointer">
    //     <div> */}
    //     <div className="w-80 h-110 rounded-lg bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out bg-gradient-to-br from-white/60 via-cyan-200/50 to-cyan-300/40 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none overflow-hidden cursor-pointer">
    //     <div>
    //       <img src="https://i.pinimg.com/736x/12/2f/0f/122f0f26992f88c6bdabf3987c3651ea.jpg" alt="" className="object-cover aspect-video p-1 rounded-sm transition-transform duration-500 ease-out group-hover:scale-105" />
    //     </div>
    //     <div className="flex gap-2 mt-3 ml-5">
    //       <Avatar>
    //         <AvatarImage src="https://i.pinimg.com/1200x/a1/75/2b/a1752b667018dfb4e831b95cb442d50d.jpg" />
    //       </Avatar>
    //       <div>
    //         <h1 className="font-sans text-sm">Virat kohli</h1>
    //         <p className="font-sans text-xs text-gray-600">02-aug-2025</p>
    //       </div>
    //     </div>

    //     <div className="mx-5 m-3">
    //       <h1 className="font-semibold line-clamp-2 text-2xl">Sweetie Fox is a Russian pornographic film actress, model, and cosplayer.</h1>
    //       <p className="font-sans text-md text-gray-600 line-clamp-2">Australia's series against Bangladesh, New Zealand and the women's Champions Trophy, as well as the WPL likely to keep their best away from domestic cricket</p>
    //     </div>

    //     <div className="flex justify-around items-center">
    //       <button class="relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black transition-all duration-300 ease-out rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95">
    //         Discover 
    //       </button>

    //       <Heart/> <Bookmark/>

    //     </div>

    //   </div>

    // </div>


    //Dark
//     <div className="min-h-screen  flex items-center justify-center p-5">
//   <div className="relative w-full max-w-[445px]">

//     {/* Background Glow */}
//     <div className="absolute -inset-10 rounded-[80px] bg-gradient-to-b from-transparent via-cyan-950/30 to-cyan-500/20 blur-3xl" />

//     {/* Card */}
//     <div className="relative overflow-hidden rounded-[52px] border border-white/10 bg-[#101518]/75 shadow-[0_25px_70px_rgba(0,0,0,0.55)] backdrop-blur-[25px]">

//       {/* Bottom blue glass gradient */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-transparent via-cyan-950/20 to-cyan-500/20" />

//       <div className="relative p-[38px] sm:p-[42px]">

//         {/* Share */}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 active:scale-95"
//             aria-label="Share"
//           >
//             <Share />
//           </button>
//         </div>

//         {/* Profile */}
//         <div className="mt-1">
//           <div className="h-[94px] w-[94px] overflow-hidden rounded-full bg-cyan-900/40 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
//             <img
//               src="https://i.pinimg.com/736x/fb/fe/5a/fbfe5ac3962e7efc98f4081aba98687b.jpg"
//               alt="Chloe Harrison"
//               className="h-full w-full object-cover"
//             />
//           </div>

//           <h1 className="mt-5 text-[32px] font-medium leading-none tracking-[-1.5px] text-white">
//             Chloe Harrison
//           </h1>

//           <p className="mt-2 text-[20px] leading-none text-white/45">
//             Product designer
//           </p>
//         </div>

//         {/* Tags */}
//         <div className="mt-4 flex gap-2">
//           <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] text-white/50 shadow-sm">
//             Figma
//           </span>

//           <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] text-white/50 shadow-sm">
//             UX Design
//           </span>
//         </div>

//         {/* Stats */}
//         <div className="mt-11 grid grid-cols-3">

//           {/* Rating */}
//           <div className="flex items-start gap-2">
//             <div className="mt-[1px] text-white">
//               <Star />
//             </div>

//             <div>
//               <div className="text-[20px] font-medium leading-none text-white">
//                 4.5
//               </div>

//               <div className="mt-2 text-[15px] text-white/40">
//                 Rating
//               </div>
//             </div>
//           </div>

//           {/* Earned */}
//           <div className="border-l border-white/10 pl-8">
//             <div className="text-[20px] font-medium leading-none text-white">
//               $15K+
//             </div>

//             <div className="mt-2 text-[15px] text-white/40">
//               Earned
//             </div>
//           </div>

//           {/* Rate */}
//           <div className="border-l border-white/10 pl-8">
//             <div className="text-[20px] font-medium leading-none text-white">
//               $80/hr
//             </div>

//             <div className="mt-2 text-[15px] text-white/40">
//               Rate
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-9 flex items-center gap-4">

//           {/* Liquid Glass Button */}
//           <button
//             type="button"
//             className="relative flex h-[78px] flex-1 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] text-[20px] font-medium text-white backdrop-blur-[24px] backdrop-saturate-[180%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(255,255,255,0.05),0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:bg-white/[0.10] hover:border-cyan-300/30 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_10px_35px_rgba(34,211,238,0.12)] active:scale-[0.985]"
//           >
//             {/* Top reflection */}
//             <span className="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent" />

//             {/* Refraction */}
//             <span className="pointer-events-none absolute -left-[12%] -top-[100%] h-[250%] w-[42%] rotate-[20deg] rounded-full bg-cyan-200/[0.06] blur-2xl" />

//             {/* Bottom glow */}
//             <span className="pointer-events-none absolute inset-x-[8%] bottom-1 h-[35%] rounded-full bg-cyan-400/[0.08] blur-xl" />

//             <span className="relative z-10">
//               Get in touch
//             </span>
//           </button>

//           {/* Bookmark */}
//           <button
//             onClick={() => toast.error("good buddy hi")}
//             type="button"
//             className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition hover:scale-105 hover:bg-white/[0.08] active:scale-95"
//             aria-label="Save profile"
//           >
//             <Bookmark />
//           </button>

//         </div>
//       </div>
//     </div>
//   </div>
// </div>
  );
}

