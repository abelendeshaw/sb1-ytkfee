import Quiz from '@/components/Quiz';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Quiz />
      </div>
    </main>
  );
}