import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";

const Sidebar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore()

    const onlineUsers = [];

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (!isUsersLoading) return <SidebarSkeleton/>

    return (
        <div>Sidebar</div>
    )
}
export default Sidebar
