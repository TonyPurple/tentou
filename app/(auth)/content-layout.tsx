type Props = {
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function ContentLayout({ title, description, action, children }: Props) {
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {action}
      </header>
      {children}
    </>
  );
}
