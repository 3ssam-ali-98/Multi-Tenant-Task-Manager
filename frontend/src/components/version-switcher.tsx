// "use client"

// import * as React from "react"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu"
// import {
//   SidebarMenu,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { HugeiconsIcon } from "@hugeicons/react"
// import { LayoutBottomIcon, Tick02Icon } from "@hugeicons/core-free-icons"

// export function VersionSwitcher({
//   versions,
//   defaultVersion,
// }: {
//   versions: string[]
//   defaultVersion: string
// }) {
//   const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)
  
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//             <div className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium hover:bg-sidebar-primary/50">
//               <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                 <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} className="size-4" />
//               </div>
//               <div className="flex flex-col gap-0.5 leading-none">
//                 <span className="font-medium">MTTM</span>
//               </div>
//             </div>
//           <DropdownMenuContent
//             className="w-(--radix-dropdown-menu-trigger-width)"
//             align="start"
//           >
//             {versions.map((version) => (
//               <DropdownMenuItem
//                 key={version}
//                 onSelect={() => setSelectedVersion(version)}
//               >
//                 v{version}{" "}
//                 {version === selectedVersion && (
//                   <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="ml-auto" />
//                 )}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }
