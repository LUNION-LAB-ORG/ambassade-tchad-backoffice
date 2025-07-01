"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { IDish } from "@/features/menu/types/dish.types"

export const columns: ColumnDef<IDish>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className="xl:w-16">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
    },
    {
        accessorKey: "price",
        header: "Prix",
        cell: ({ row }) => <span>{row.getValue("price")} FCFA</span>,
    },
    {
        accessorKey: "is_promotion",
        header: "Promo",
        cell: ({ row }) =>
            row.getValue("is_promotion") ? (
                <Badge className="bg-yellow-100 text-yellow-800">Oui</Badge>
            ) : (
                <Badge className="bg-gray-100 text-gray-800">Non</Badge>
            ),
    },
    {
        accessorKey: "promotion_price",
        header: "Prix Promo",
        cell: ({ row }) => <span>{row.getValue("promotion_price")} FCFA</span>,
    },
    {
        accessorKey: "category.name",
        header: "Catégorie",
        cell: ({ row }) => (
            <span>{row.original.category?.name ?? "N/A"}</span>
        ),
    },
    {
        accessorKey: "entity_status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("entity_status");
            const badgeClass =
                status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800";
            return (
                <Badge className={cn("rounded-full px-4", badgeClass)}>
                    {String(status).toUpperCase()}
                </Badge>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Créé le",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            return <span>{date.toLocaleDateString()}</span>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-0" align="end">
                        <DropdownMenuItem className="p-2">
                            <Eye className="w-4 h-4 me-1.5" />
                            Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2">
                            <SquarePen className="w-4 h-4 me-1.5" />
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 text-destructive">
                            <Trash2 className="w-4 h-4 me-1.5" />
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
