import AppLayout from "@/components/components/appLayout";
import FeedContent from "@/components/components/feed-content";
import HomeSidebar from "@/components/components/home-sidebar";
// import ProfileSidebar from "@/components/components/profile-sidebar";

export default function dashboard() {
    return (
        <AppLayout rightSidebarContent={<HomeSidebar />}>
            <FeedContent />
        </AppLayout>
    )
}