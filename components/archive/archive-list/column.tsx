
import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen, Trash2 } from "lucide-react"
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
  user: {
    name: string
    image: string
  }
  service: string
  post: string
  role: "personnel" | "admin" | "consul" | "super-admin"
}

export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "user",
    header: "Nom Complet",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex gap-3 items-center font-medium text-card-foreground/80">
          <Avatar className="w-8 h-8">
            {user?.image ? (
              <AvatarImage src={user.image} />
            ) : (
              <AvatarFallback>AB</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-default-600">{user?.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <span>{row.getValue("service")}</span>,
  },
  {
    accessorKey: "post",
    header: "Poste",
    cell: ({ row }) => <span>{row.getValue("post")}</span>,
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const role = row.getValue<string>("role")
      const statusColors: Record<string, string> = {
        admin: "bg-green-100 text-green-600",
        "super-admin": "bg-yellow-100 text-yellow-700",
        personnel: "bg-red-100 text-red-600",
        consul: "bg-blue-100 text-blue-600",
        default: "bg-muted text-muted-foreground",
      }

      const roleStyles = statusColors[role] || statusColors.default

      return (
        <Badge className={cn("rounded-full px-4 py-1 text-xs capitalize", roleStyles)}>
          {role}
        </Badge>
      )
    },
  },
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
