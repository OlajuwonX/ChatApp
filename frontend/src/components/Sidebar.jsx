import {useEffect} from "react"
import {useChatStore} from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import {Users} from "lucide-react";

const Sidebar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore()

    const onlineUsers = [];

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (!isUsersLoading) return <SidebarSkeleton/>

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6"/>
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>

                {/*Online filter toggle*/}

                <div className="overflow-y-auto w-full py-3">
                    { users.map((user) => (
                        <button
                            key={user._id} //according to mongodb
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>

                        </button>
                        ))
                </div>

            </div>
        </aside>
    )
}
export default Sidebar
