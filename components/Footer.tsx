export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()}{' '}
              {process.env.NEXT_PUBLIC_SITE_NAME}. All rights reserved.
            </div>
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              Powered by{' '}
              <span className="font-semibold">
                <a target="_blank" href="https://together.ai/" rel="noreferrer">
                  together.ai
                </a>
              </span>{' '}
              and{' '}
              <span className="font-semibold">
                <a
                  target="_blank"
                  href="https://blackforestlabs.ai/"
                  rel="noreferrer"
                >
                  Flux
                </a>
              </span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_GITHUB_URL}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_TWITTER_URL}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
