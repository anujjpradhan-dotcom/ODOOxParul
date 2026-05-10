import { useAuthStore } from "@/stores/auth.store";

export function WelcomeSection() {
  const { user } = useAuthStore();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-2 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">
        {getGreeting()}, <span className="text-brand-primary">{user?.firstName}</span>!
      </h1>
      <p className="text-muted-foreground text-lg">
        Ready for your next adventure? Let's start planning.
      </p>
    </div>
  );
}
