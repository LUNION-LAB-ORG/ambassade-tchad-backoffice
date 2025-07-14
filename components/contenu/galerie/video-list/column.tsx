import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen, Trash2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type DataProps = {
  id: string | number
  titre:string
  description:string
  date:string
  user:string
  video: string
  status: "brouillon" | "publié"
  action: null | string
}

export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "date",
    header: "Date de publication",
    cell: ({ row }) => <span>{row.getValue("date")}</span>,
  },
  {
    accessorKey: "user",
    header: "Auteur",
    cell: ({ row }) =><span>{row.getValue("user")}</span>
    
  },
  {
    accessorKey: "titre",
    header: "Titre",
    cell: ({ row }) => <span>{row.getValue("titre")}</span>,
  },
  {
    accessorKey: "video",
    header: "Vidéo",
    cell: ({ row }) => {
      const videoUrl = row.getValue("video") as string;
      return (
        <div className="flex items-center gap-2">
          <div className="relative w-20 h-12 bg-gray-100 rounded overflow-hidden group cursor-pointer">
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-xs text-muted-foreground max-w-[100px] truncate">
                  {videoUrl.split('/').pop()}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{videoUrl}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span>{row.getValue("description")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      const statusColors: Record<string, string> = {
        brouillon: "bg-red-100 text-red-600",
        publié: "bg-green-100 text-green-700",
       
      }
      const statuStyles = statusColors[status] || statusColors.default
      
            return (
              <Badge className={cn("rounded-full px-4 py-1 text-xs capitalize", statuStyles)}>
                {status}
              </Badge>
            )
    },
  },
  // {
  //   accessorKey: "demandeTraitée",
  //   header: "Traitement",
  //   cell: ({ row }) => {
  //     const value = row.getValue<string>("demandeTraitée")
  //     const colorMap: Record<string, string> = {
  //       approuvée: "bg-emerald-100 text-emerald-700",
  //       archivée: "bg-gray-100 text-gray-600",
  //       rejetée: "bg-red-100 text-red-600",
  //     }
  //     return (
  //       <Badge className={cn("rounded-full px-3 py-1 text-xs capitalize", colorMap[value])}>
  //         {value}
  //       </Badge>
  //     )
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const user = row.original
      const meta = table.options.meta as {
        onView: (user: DataProps) => void
        onEdit: (user: DataProps) => void
        onDelete: (user: DataProps) => void
      }

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => meta.onView(user)}
                  className="w-7 h-7"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voir</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => meta.onEdit(user)}
                  className="w-7 h-7"
                >
                  <SquarePen className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => meta.onDelete(user)}
                  className="w-7 h-7"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Supprimer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
