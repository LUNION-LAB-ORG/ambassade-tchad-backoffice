
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from '@/i18n/routing';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { messages, type Message } from "./data";
import shortImage from "@/public/images/all-img/short-image-2.png";
import { Icon } from "@/components/ui/icon";

const Messages = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button type="button" className="relative focus:ring-none focus:outline-none md:h-8 md:w-8 md:bg-embassy-blue-100 hover:bg-embassy-blue-200 text-embassy-blue-700 rounded-full md:flex hidden flex-col items-center justify-center transition-all duration-300 dark:md:bg-embassy-blue-800/30 dark:text-embassy-blue-300 dark:hover:bg-embassy-blue-700/40">
                    <Icon icon="heroicons-outline:mail" className="h-5 w-5" />
                    <Badge className="w-4 h-4 p-0 text-[8px] rounded-full font-semibold items-center justify-center absolute left-[calc(100%-12px)] bottom-[calc(100%-10px)] bg-embassy-red-500 text-white border-white dark:border-slate-800" color="destructive">
                        10
                    </Badge>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="z-[999] mx-4 lg:w-[320px] p-0 bg-white/95 backdrop-blur-sm border border-embassy-blue-200 shadow-xl dark:bg-slate-800/95 dark:border-embassy-blue-400/30"
            >
                <DropdownMenuLabel>
                    <div className="flex justify-between px-4 py-3 border-b border-embassy-blue-100 dark:border-embassy-blue-700/30">
                        <div className="text-sm text-embassy-blue-800 font-semibold dark:text-embassy-blue-200">
                            Messages
                        </div>
                        <div className="text-embassy-blue-600 text-xs md:text-right dark:text-embassy-blue-400">
                            <Link href="/chats" className="underline hover:text-embassy-blue-800 transition-colors dark:hover:text-embassy-blue-300">
                                Voir tout
                            </Link>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <div className="h-[300px] xl:h-[350px]">
                    <ScrollArea className="h-full">
                        {messages?.map((item: Message, index: number) => (
                            <DropdownMenuItem
                                key={`inbox-${index}`}
                                className="flex items-start gap-3 py-3 px-4 cursor-pointer group hover:bg-embassy-blue-50 transition-colors duration-200 dark:hover:bg-embassy-blue-800/30"
                            >
                                <div className="flex-none">
                                    <Avatar className="h-8 w-8 border border-embassy-blue-200 dark:border-embassy-blue-600">
                                        <AvatarImage src={item?.image} />
                                        <AvatarFallback className="bg-embassy-blue-100 text-embassy-blue-700 text-xs font-semibold dark:bg-embassy-blue-700 dark:text-embassy-blue-200">{item.title.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="text-embassy-blue-800 text-sm font-medium group-hover:text-embassy-blue-900 dark:text-embassy-blue-200 dark:group-hover:text-embassy-blue-100">
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-embassy-blue-600 group-hover:text-embassy-blue-700 dark:text-embassy-blue-400 dark:group-hover:text-embassy-blue-300">
                                        {item.desc}
                                    </div>
                                    <div className="text-embassy-blue-500 group-hover:text-embassy-blue-600 text-xs dark:text-embassy-blue-500 dark:group-hover:text-embassy-blue-400">
                                        Il y a 3 minutes
                                    </div>
                                </div>
                                {item.hasnotifaction && (
                                    <div className="flex-none">
                                        <span className="h-[10px] w-[10px] bg-embassy-red-500 border-2 border-white dark:border-slate-800 rounded-full inline-block animate-pulse" />
                                    </div>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Messages;
