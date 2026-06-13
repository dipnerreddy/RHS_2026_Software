export default function AuthLayout({
  title,
  children,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}