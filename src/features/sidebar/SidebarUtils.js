import { Bell, HatGlasses, Rss, Tag, UserRoundCog } from "lucide-react";
import { Profiler } from "react";

export const SideBarUtils = [
    {id: 'recent',name: 'Recent', icon: Rss},
    {id: 'anonymous',name: 'Anonymous', icon: HatGlasses},
    {id: 'notification',name: 'Notification', icon: Bell},
    {id: 'tags',name: 'Tags', icon: Tag},
    {id: 'profile',name: 'Profile', icon: UserRoundCog},
]