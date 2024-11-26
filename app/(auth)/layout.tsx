import { Sidebar } from "@/app/(auth)/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh">
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
        <Sidebar />
      </div>
      <main className="lg:pl-64 flex w-full pb-2 lg:pr-4 lg:pt-2">
        <div className="bg-white grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5">
          {children}
        </div>
      </main>
    </div>
  );
}
