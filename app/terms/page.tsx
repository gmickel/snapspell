import type React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Last updated: {process.env.NEXT_PUBLIC_TERMS_LAST_UPDATED}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        1. Acceptance of Terms
      </h2>
      <p>
        By using our service, you agree to these terms. Please read them
        carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        2. Description of Service
      </h2>
      <p>
        We provide an AI-powered image generation service using prompts provided
        by users. The actual image generation is performed by together.ai, a
        third-party service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        3. User Responsibilities
      </h2>
      <p>
        You are responsible for the content of the prompts you submit. Do not
        submit any prompts that are illegal, offensive, or violate the rights of
        others.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        4. Intellectual Property
      </h2>
      <p>
        The images generated through our service are subject to the terms and
        conditions of Together.ai. We do not claim ownership of the generated
        images.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        5. Limitation of Liability
      </h2>
      <p>
        We provide this service "as is" and are not responsible for the content
        of generated images or any consequences resulting from their use.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Rate Limiting</h2>
      <p>
        We implement rate limiting to ensure fair usage of our service. Attempts
        to circumvent these limits may result in temporary or permanent
        suspension of service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        7. Changes to the Service
      </h2>
      <p>
        We reserve the right to modify or discontinue the service at any time
        without notice.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Governing Law</h2>
      <p>
        These terms are governed by the laws of{' '}
        {process.env.NEXT_PUBLIC_LEGAL_JURISDICTION}, without regard to its
        conflict of law provisions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">9. Contact</h2>
      <p>
        If you have any questions about these terms, please contact us at{' '}
        {process.env.NEXT_PUBLIC_TERMS_CONTACT_EMAIL}.
      </p>
    </div>
  );
};

export default TermsOfService;
