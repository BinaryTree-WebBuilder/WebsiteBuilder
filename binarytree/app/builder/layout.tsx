

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">Builder Dashboard</h1>
      </div>
      <main className="p-6">{children}</main>
    </>
  );
}
