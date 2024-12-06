import { MobileSidebar } from "@/app/(auth)/mobile-sidebar";

type Props = {
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function ContentLayout({ title, description, action, children }: Props) {
  return (
    <div className="lg:flex lg:gap-8">
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="grow">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {action}
        </header>
        {children}
      </div>
    </div>
  );
}
