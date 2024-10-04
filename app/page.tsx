import ImageGenerationApp from '@/components/ImageGenerationApp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <ImageGenerationApp />
      </main>
      <Footer />
    </div>
  );
}
