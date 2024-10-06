import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type IntroSectionProps = {
  handleTryItNow: () => void;
};

export default function IntroSection({ handleTryItNow }: IntroSectionProps) {
  return (
    <div className="text-center py-12">
      <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
      <h2 className="text-2xl font-bold mb-4">How It Works</h2>
      <ol className="text-left max-w-md mx-auto space-y-4">
        <li className="flex items-center">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 rounded-full mr-3">
            1
          </span>
          <p>Enter a descriptive prompt in the text box above</p>
        </li>
        <li className="flex items-center">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 rounded-full mr-3">
            2
          </span>
          <p>
            Images will be generated as you type after you type a space or press
            enter
          </p>
        </li>
        <li className="flex items-center">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 rounded-full mr-3">
            3
          </span>
          <p>Watch as your images are generated based on the prompt</p>
        </li>
        <li className="flex items-center">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 rounded-full mr-3">
            4
          </span>
          <p>
            Click on the generated image to view and download it or regenerate
            it
          </p>
        </li>
        <li className="flex items-center">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 rounded-full mr-3">
            5
          </span>
          <p>
            The FLUX1.1 [pro] and FLUX1 [schnell] models are limited to a very
            low number of generations per day. Use the free FLUX1 [schnell] or
            deploy your own{' '}
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              SnapSpell instance
            </a>{' '}
            to bypass these limitations.
          </p>
        </li>
      </ol>
      <Button
        className="mt-8 bg-purple-600 hover:bg-purple-700"
        onClick={handleTryItNow}
      >
        Try it now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
