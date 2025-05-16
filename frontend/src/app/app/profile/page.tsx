import AppLayout from "@/components/components/appLayout";
import ProfileContent from "@/components/components/profile-content";
import ProfileSidebar from "@/components/components/profile-sidebar";

export default function profile() {
    return (
        <AppLayout rightSidebarContent={<ProfileSidebar />}>
            <ProfileContent />
        </AppLayout> 
    )
}