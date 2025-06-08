// app/(main)/layout.tsx
import {Header} from '@/app/main/Header';
import {Footer} from '@/app/main/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Header />
            <main>{children}</main>
        <Footer />
    </>

  );
}

