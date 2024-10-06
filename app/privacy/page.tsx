import type React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: 6th October 2024</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        1. Information We Collect
      </h2>
      <p>
        We collect and store only your IP address for the purpose of
        rate-limiting. This helps us prevent abuse of our service and ensure
        fair usage for all users.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        2. How We Use Your Information
      </h2>
      <p>
        Your IP address is used solely for rate-limiting purposes. We do not use
        this information for any other purpose, nor do we share it with any
        third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Image Generation</h2>
      <p>
        When you use our image generation feature, your prompt is sent to
        together.ai, our third-party image generation service. together.ai
        receives your prompt and returns the generated image. We do not store
        your prompts or the generated images on our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Data Retention</h2>
      <p>
        We only retain your IP address for the duration necessary to enforce our
        rate-limiting policy. This information is automatically deleted after it
        is no longer needed for this purpose.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Rights</h2>
      <p>
        As we collect minimal information, there are limited rights to exercise.
        However, if you have any concerns about our use of your IP address,
        please contact us.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        6. Changes to This Policy
      </h2>
      <p>
        We may update this privacy policy from time to time. We will notify you
        of any changes by posting the new privacy policy on this page.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us
        at {process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL}.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
