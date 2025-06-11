import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8">
        <Link href="/" aria-label="VaultbyChase Home">
          <Logo height={48} priority />
        </Link>
      </div>
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl sm:p-8">
        {children}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Need help? <Link href="/support" className="font-medium text-primary hover:underline">Contact Support</Link>
      </p>
    </div>
  );
}
